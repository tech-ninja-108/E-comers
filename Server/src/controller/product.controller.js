import productModel from "../models/product.model.js";
import imageKit from "../services/imagekit.server.js";

const createProduct = async (req, res) => {
  try {
    const { title, description, category, brand, tags, variants } = req.body;
    const images = req.files;

    console.log(variants);
    console.log(description);

    console.log(category);

    console.log(brand);
    console.log(tags);

    /// filter user
    const user = req.user;
    if (user.role !== "seller") {
      return res.status(400).json({
        message: "You are not seller",
        errors: [
          {
            type: "field",
            msg: "You are not seller",
          },
        ],
      });
    }

    //create image url useing imagekit
    const image = images.map(async (file) => {
      const imagekitImage = await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "/e-commerce/products",
      });
      return { url: imagekitImage.url, fileId: imagekitImage.fileId };
    });
    const uploadedImage = await Promise.all(image);

    const updateVariants = variants.map((item) => {
      const discount = Number(
        (((item.mrp - item.price) / item.mrp) * 100).toFixed(2),
      );
      return {
        ...item,
        discountPercentage: discount,
      };
    });

    await productModel.create({
      title,
      description,
      category,
      brand,
      images: uploadedImage,
      tags,
      variants: updateVariants,
      seller: user._id,
    });
    res.status(201).json({
      message: "Product create successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errer",
    });
  }
};

const getSellerProduct = async (req, res) => {
  /// filter user
  const user = req.user;
  if (user.role !== "seller") {
    return res.status(400).json({
      message: "You are not seller",
      errors: [
        {
          type: "field",
          msg: "You are not seller",
        },
      ],
    });
  }
  const product = await productModel
    .find({ seller: user._id })
    .populate("category", "name")
    .populate("seller", "name")
    .select("-__v -createdAt -updatedAt");

  if (product.length == 0) {
    return res.status(400).json({
      message: "Product not found",
      errors: [
        {
          type: "field",
          msg: "Product not found",
        },
      ],
    });
  }
  return res.status(200).json({
    message: "Product Found",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  /// filter user
  const user = req.user;
  if (user.role !== "seller") {
    return res.status(400).json({
      message: "You are not seller",
      errors: [
        {
          type: "field",
          msg: "You are not seller",
        },
      ],
    });
  }
  const { id } = req.params;
  const redeleteProduct = await productModel.findByIdAndDelete(id);
  if (!redeleteProduct) {
    return res.status(404).json({
      message: "Product not ablible in database",
      errors: [
        {
          type: "field",
          msg: "product not found",
        },
      ],
    });
  }
  res.status(200).json({
    message: "Product delete successfully",
  });
};

const statusupdate = async (req, res) => {
  const user = req.user;
  if (user.role !== "seller") {
    return res.status(400).json({
      message: "You are not seller",
      errors: [
        {
          type: "field",
          msg: "You are not seller",
        },
      ],
    });
  }
  const { ProductId } = req.params;
  console.log(ProductId);

  const product = await productModel.findById({ _id: ProductId });
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.isActive = !product.isActive;
  await product.save();
  return res.status(200).json({
    message: "Product status updated",
  });
};
const updataProduct = async (req, res) => {
  const { title, description, category, brand, tags, variants } = req.body;
  const images = req.files;
  const user = req.user;
  const { id } = req.params;

  if (user.role !== "seller") {
    return res.status(400).json({
      message: "You are not seller",
      errors: [
        {
          type: "field",
          msg: "You are not seller",
        },
      ],
    });
  }

  const existProduct = await productModel.findById(id);
  if (!existProduct) {
    return res.status(400).json({
      message: "Product not found",
      errors: [
        {
          type: "field",
          msg: "Product not fund",
        },
      ],
    });
  }

  let uploadedImage = existProduct.images;
  if (images && images.length > 0) {
    const deletePromiss = existProduct.images.map(async (img) => {
      if (img.fileId) {
        await imageKit.deleteFile(img.fileId);
      }
    });
    await Promise.all(deletePromiss);

    const image = images.map(async (file) => {
      const imagekitImage = await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "/e-commerce/products",
      });
      return { url: imagekitImage.url, fileId: imagekitImage.fileId };
    });
    uploadedImage = await Promise.all(image);
  }

  const updateVariants = variants.map((item) => {
    const discount = Number(
      (((item.mrp - item.price) / item.mrp) * 100).toFixed(2),
    );
    return {
      ...item,
      discountPercentage: discount,
    };
  });
  const updateProducts = await productModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      category,
      brand,
      tags,
      images: uploadedImage,
      variants: updateVariants,
    },
  );
  if (!updateProducts) {
    return res.status(404).json({
      message: "Product not ablible in database",
      errors: [
        {
          type: "field",
          msg: "product not found",
        },
      ],
    });
  }
  res.status(201).json({
    message: "Product update successfully",
  });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (user.role !== "seller") {
    return res.status(400).json({
      message: "You are not seller",
      errors: [
        {
          type: "field",
          msg: "You are not seller",
        },
      ],
    });
  }
  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "Product not ablible in database",
      errors: [
        {
          type: "field",
          msg: "product not found",
        },
      ],
    });
  }

  res.status(200).json({
    message: "Product fetched successfully for update",
    data: product,
  });
};

//for buyer
const getProduct = async (req, res) => {
  const product = await productModel.find({});
  res.status(200).json({
    message: "Product find successfully",
    data: product,
  });
};

const singleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate("category", "name")
    .populate("seller", "name")
    .select("-__v -createdAt -updatedAt -isActive");
  if (!product) {
    return res.status(400).json({
      message: "Product not found",
      errors: [
        {
          type: "field",
          msg: "Product not avlible in database",
        },
      ],
    });
  }
  const category = await productModel
    .find({ category: product.category })
    .populate("category", "name")
    .populate("seller", "name")
    .select("-__v -createdAt -updatedAt -isActive");
  res.status(200).json({
    message: "Product find successfully",
    data: product,
    category: category,
  });
};
export {
  createProduct,
  getSellerProduct,
  getProduct,
  deleteProduct,
  getSingleProduct,
  updataProduct,
  singleProduct,
  statusupdate,
};
