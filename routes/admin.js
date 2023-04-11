import express from "express";
const router = express.Router();
import {
  deleteAdmin,
  getAll,
  getById,
  post,
  put,
} from "../controllers/admin.js";

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", put);
router.delete(":id", deleteAdmin);

export default router;
