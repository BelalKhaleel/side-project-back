import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all admins
export const getAllAdmins = (req, res, next) => {
  Admin.find()
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//get an admin by id
export const getAdminById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let admin = await Admin.findOne({ _id: id });
    if (!admin) {
      throw new Error("Admin not found");
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//Admin Registration
export const signup_admin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin)
      return res.status(409).json({
        message: "Mail already exists",
      });

    const hash = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
    await newAdmin
      .save()
      .then((response) => {
        res
          .status(201)
          .json({ success: true, response, message: "Admin Created" });
      })
      .catch((err) => {
        res.status(400).json({ success: false, err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

//Admin login
export const admin_login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    console.log("admin", admin);
    if (!admin) {
      res.status(404).json({
        message: "Admin does not exist",
      });
    }
    let { password } = req.body;
    const result = await bcrypt.compare(password, admin.password);
    if (result) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
      res.status(200).json({
        message: "Auth Successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

//update an admin by id
export const editAdmin = (req, res, next) => {
  let { id } = req.params;
  let body = req.body;
  Admin.findOneAndUpdate({ _id: id }, { $set: body },{new: true})
    .then((response) => {
      res
        .status(200)
        .send({ success: true, response, message: "Admin updated successfully!" });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//delete admin
export const delete_admin = async (req, res, next) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true, result, message: "Admin deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
