import express from "express";
const router = express.Router();
import controller from "../controllers/admin.js";
import { signup_admin, admin_login, delete_admin } from "../controllers/AuthController.js";
import checkAuth from "../middleware/check-auth.js";

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

router.post("/signup", signup_admin);
router.post("/login", admin_login);
router.delete("/:adminId", checkAuth, delete_admin);

export default router;

