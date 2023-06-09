import Model from "../models/category.js";

class Controller {
  //callback functions used in category routes
  //get all the categories
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

  //get a category by id
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

  //create a new category
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

  //update a category by id
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.findOneAndUpdate({ _id: id }, { $set: body })
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .send({ success: true, message: "Category updated successfully!" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //delete category by id
  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }).then((response) => {
      if (!response) {
        res.status(404).send({ message: "Not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "Deleted category successfully" });
      }
    });
  }
}

const controller = new Controller();

export default controller;
