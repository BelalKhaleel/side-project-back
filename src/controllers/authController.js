import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";

export const signup_admin = async (req, res, next) => {
  try {
    const admins = await Admin.find({ email: req.body.email }).exec();
    if (admins.length >= 1) {
      return res.status(409).json({
        message: "Mail exists",
      });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      await admin.save();
      console.log(result);
      res.status(201).json({
        message: "Admin Created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const admin_login = async (req, res, next) => {
  try {
    const admin = await Admin.find({ email: req.body.email }).exec();
    console.log("admin", admin);
    if (admin.length < 1) {
      res.status(401).json({
        message: "Auth Failed",
      });
    }
    const result = await bcrypt.compare(req.body.password, admin[0].password);
    if (result) {
      const token = jwt.sign(
        {
          email: admin[0].email,
          adminId: admin[0]._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        message: "Auth Successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Auth Failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const delete_admin = async (req, res, next) => {
  try {
    const result = await Admin.remove({ _id: req.params.adminId }).exec();
    res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
