import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productSchema.pre(["find", "findOne"], function () {
  this.populate(["category", "image"]);
});

const Product = model("Product", productSchema);
export default Product;
