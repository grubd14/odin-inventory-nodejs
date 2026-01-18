import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post("/:name/:description", createCategory)

export { categoryRouter };
