import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

//major TO_DO 
// updated all the routes to use basic parameters

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post("/:name/:description", createCategory)
categoryRouter.post("/:id/:updatedName/:updatedDescription",updateCategory )
categoryRouter.post(":id", deleteCategory)


export { categoryRouter };
