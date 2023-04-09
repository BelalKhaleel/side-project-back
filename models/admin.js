import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admins",
  }
);

const Admin = model("Admin", adminSchema);
export default Admin;
