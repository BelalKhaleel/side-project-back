import mongoose from "mongoose";
const { Schema, model } = mongoose;

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true
    },
    destination: {
    type: String,
    required: true
    },
  },
  {
    collection: "files",
    timestamps: true,
  }
);

const file = model("File", fileSchema);
module.exports = file;
