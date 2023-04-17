import Model from "../models/admin.js";

class Controller {
  //callback functions used in admin routes
  //get all the admins
  getAll(req, res, next) {
    Model.find()
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //get an admin by id
  getById(req, res, next) {
    console.log("params", req.params);
    let { id } = req.params;
    Model.findOne({ _id: id })
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //create a new admin
  post(req, res, next) {
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
  }

  //update an admin by id
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.findOneAndUpdate({ _id: id }, { $set: body })
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .send({ success: true, message: "Admin updated successfully!" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //delete admin by id
  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }).then((response) => {
      if (!response) {
        res.status(404).send({ message: "Not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "Deleted admin successfully" });
      }
    });
  }
}

const controller = new Controller();

export default controller;

// import { response } from "express";
// import Model from "../models/admin.js";

// //callback functions used in admin routes
// //get all the admins
// export const getAll = (req, res, next) => {
//   Model.find({}, (err, response) => {
//     if (err) return next(err);
//     res.status(200).send({ success: true, response });
//   });
// };

// //get an admin by id
// export const getById = (req, res, next) => {
//   console.log("params", req.params);
//   let { id } = req.params;
//   Model.findOne({ _id: id })
//   .then((response) => {
//     console.log(response);
//     res.status(200).send({ success: true, response });
//   })
//   .catch((error) => {
//     res.status(500).send(error);
//   });
// }

// //create new admin
// export const post = (req, res, next) => {
//   let body = req.body;
//   console.log(body);
//   let doc = new Model(body);
//   doc
//     .save()
//     .then((response) => {
//       console.log(response);
//       res.status(200).send({ success: true, response });
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// };

// //update admin by id
// export const put = (req, res, next) => {
//   let { id } = req.params;
//   Model.findOneAndUpdate({ _id: id }, (err, response) => {
//     if (err) return next(err);
//     res.status(200).send({ success: true, response });
//   });
// };

// //delete admin by id
// export const deleteAdmin = (req, res, next) => {
//   let { id } = req.params;
//   Model.findByIdAndDelete({ _id: id })
//   .then((response)=> {
//     if(!response) {
//       res.status(404).send({ message: "Not found" });
//     } else {
//       res.status(200).send( {status: 200, message: "Deleted admin successfully" })
//     }
//   })
// };
