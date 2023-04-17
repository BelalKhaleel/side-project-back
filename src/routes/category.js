import express from "express";
const router = express.Router();
import controller from "../controllers/category.js";
import checkAuth from "../middleware/check-auth.js";

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/",checkAuth, controller.post);
router.put("/:id",checkAuth, controller.put);
router.delete("/:id",checkAuth, controller.delete);

export default router;
