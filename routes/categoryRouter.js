import { Router } from "express";
import { getAllCategories, getCategoryById } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById)

export { categoryRouter };
