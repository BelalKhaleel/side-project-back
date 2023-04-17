import express from "express";
const router = express.Router();
import controller from "../controllers/product.js";
import checkAuth from "../middleware/check-auth.js";
import upload from "../middleware/image-upload.js";

router.get("/all", controller.getAll);
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/",checkAuth, upload.single("image"), controller.post);
router.put("/:id",checkAuth, controller.put);
router.patch("/",checkAuth, controller.softDelete);
router.delete("/:id",checkAuth, controller.delete);

export default router;
