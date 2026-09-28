import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          min: 0,
          required: true,
        },
        price: {
          type: Number,
          min: 0.1,
          required: true,
        },
        mrp: {
          type: Number,
          min: 0.1,
          required: true,
        },
        currency: {
          type: String,
          enum: ["INR", "USD"],
          default: "INR",
          required: true,
        },
        discountPercentage: {
          type: Number,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        reviewerName: {
          type: String,
        },
        reviewerEmail: {
          type: String,
        },
      },
    ],
    warrantyInformation: {
      type: String,
      required: true,
      default: "No warranty",
    },
    shippingInformation: {
      type: String,
      required: true,
      default: "Ship in 1 day",
    },
    availabilityStatus: {
      type: String,
    },
    returnPolicy: {
      type: String,
      required: true,
      default: "7 days return policy",
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    images: [
      {
        url: { type: String, required: true },
        fileId: { type: String, required: true },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
