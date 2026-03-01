import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  updateCategory,
} from "../controllers/categoryController.js";
import { requireAdmin } from "../middleware/requiredAdmin.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);

categoryRouter.post("/create", requireAdmin, createCategory);
categoryRouter.post("/:id/update", requireAdmin, updateCategory);
categoryRouter.delete("/:id", requireAdmin, deleteCategory);

export { categoryRouter };
