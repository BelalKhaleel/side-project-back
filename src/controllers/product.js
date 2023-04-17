import Model from "../models/product.js";

class Controller {
  //callback functions used in product routes
  //get all the products in the DB (even the softdeleted products)
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

  //get the products present
  get(req, res, next) {
    Model.find({ isDeleted: false })
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //get a product by id
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

  //create a new product
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

  //update a product by id
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.findOneAndUpdate({ _id: id }, { $set: body })
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .send({ success: true, message: "Product updated successfully!" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //delete product by id
  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }).then((response) => {
      if (!response) {
        res.status(404).send({ message: "Not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "Deleted product successfully" });
      }
    });
  }

  softDelete(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .send({ success: true, message: "Product hidden successfully!" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

const controller = new Controller();

export default controller;
