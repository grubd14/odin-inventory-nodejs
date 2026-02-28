import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

//major TO_DO
// updated all the routes to use basic parameters

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.post("/:id/update", updateCategory);
categoryRouter.get("/:id", getCategoryById);
// categoryRouter.get("/:id", getItemsByCategoryId)
categoryRouter.delete("/:id", deleteCategory);

export { categoryRouter };
