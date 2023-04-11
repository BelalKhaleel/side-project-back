import { response } from "express";
import Model from "../models/admin.js";

//callback functions used in admin routes
//get all the admins
export const getAll = (req, res, next) => {
  Model.find({}, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};

//get an admin by id
export const getById = (req, res, next) => {
  let { id } = req.params;
  Model.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};

//create admin
export const post = (req, res, next) => {
  let body = req.body;
  console.log(body);
  let doc = new Model(body);
  doc
    .save()
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//update admin by id
export const put = (req, res, next) => {
  let { id } = req.params;
  Model.findOneAndUpdate({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};

//delete admin by id
export const deleteAdmin = (req, res, next) => {
  let { id } = req.params;
  Model.findOneAndDelete({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};
