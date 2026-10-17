import { body, validationResult, header } from "express-validator";

const ProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be 3 to 30 character"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 3, max: 300 })
    .withMessage("Description must be 3 to 300 character"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .bail()
    .trim()
    .isMongoId()
    .isLength({ min: 3, max: 30 })
    .withMessage("Category must be 3 to 30 character"),
  body("variants")
    .isArray({ min: 1 })
    .withMessage("At least one product variant is required"),
  body("variants.*.size")
    .exists()
    .withMessage("Size is required")
    .isString()
    .isIn(["S", "M", "L", "X", "XL"])
    .withMessage("Size is in S,M,L,X,XL"),
  body("variants.*.color").exists().withMessage("Color is require").isString(),
  body("variants.*.stock").exists().withMessage("stock is require").isNumeric(),
  body("variants.*.price").exists().withMessage("price is require").isNumeric(),
  body("variants.*.mrp").exists().withMessage("MRP is require").isNumeric(),
  body("brand")
    .exists()
    .withMessage("Brand is require")
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Brand must be 3 to 100 character"),
  body("variants.*.currency")
    .optional()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be either INR or USD"),
  body("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings"),
  body("tags.*").optional().isString().trim(),
  body("brand")
    .exists({ checkFalsy: true })
    .withMessage("Brand is required")
    .bail()
    .isString()
    .withMessage("Brand must be a string")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// Create product ke liye
export const CreateImageValidator = body("images").custom((value, { req }) => {
  if (!req.files || req.files.length === 0) {
    throw new Error("At least one product image is required");
  }
  if (req.files.length > 5) {
    throw new Error("Maximum 5 images allowed");
  }
  return true;
});

// Update product ke liye
export const UpdateImageValidator = body("existingImages")
  .optional()
  .custom((value, { req }) => {
    let existingImages = [];

    try {
      existingImages = value ? JSON.parse(value) : [];
    } catch {
      throw new Error("Invalid existing images");
    }

    const newImages = req.files || [];

    if (existingImages.length + newImages.length === 0) {
      throw new Error("At least one product image is required");
    }

    if (existingImages.length + newImages.length > 5) {
      throw new Error("Maximum 5 images allowed");
    }

    return true;
  });
export default ProductValidator;
