import express from "express";
const router = express.Router();
import { signup_admin, admin_login, delete_admin, getAllAdmins, getAdminById, editAdmin} from "../controllers/admin.js";
import checkAuth from "../middleware/check-auth.js";

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", checkAuth, editAdmin);

router.post("/signup", signup_admin);
router.post("/login", admin_login);
router.delete("/:id", checkAuth, delete_admin);

export default router;
