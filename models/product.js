import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
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
      type: Schema.Types.ObjectId,
      ref: "File",
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

productSchema.pref(["find", "findOne"], function () {
  this.populate(["category", "image"]);
});
const Product = model("Product", productSchema);
export default Product;
