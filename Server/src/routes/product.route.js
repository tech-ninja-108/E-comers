import { Router } from "express";
import ProductValidator from "../validator/product.validator.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSellerProduct,
  getSingleProduct,
  singleProduct,
  updataProduct,
} from "../controller/product.controller.js";
import findUser from "../middleware/funduser.middleware.js";
import uploads from "../middleware/uploads.js";
import dataParse from "../middleware/data.parse.js";
import asyncHandler from "../util/asyncHandler.js";

const productRouter = Router();

productRouter.post(
  "/products",
  uploads.array("images"),
  dataParse,
  ProductValidator,
  findUser,
  asyncHandler(createProduct),
);
productRouter.get("/products", findUser, asyncHandler(getSellerProduct));
productRouter.get("/allproduct", asyncHandler(getProduct));
productRouter.delete("/products/:id", findUser, asyncHandler(deleteProduct));
productRouter.get(
  "/singleproduct/:id",
  findUser,
  asyncHandler(getSingleProduct),
);
productRouter.put(
  "/products/:id",
  uploads.array("images"),
  dataParse,
  ProductValidator,
  findUser,
  asyncHandler(updataProduct),
);
productRouter.get("/product/:id", asyncHandler(singleProduct));

export default productRouter;
