import { Router } from "express";
import {
  getAllTheItems,
  addItem,
  deleteItem,
  updateItem,
  updateItemQuantity,
  getItemById,
} from "../controllers/itemController.js";
import { requireAdmin } from "../middleware/requiredAdmin.js";

const itemRouter = Router();

itemRouter.get("/", getAllTheItems);
itemRouter.get("/:id", getItemById);

itemRouter.post("/add", requireAdmin, addItem);
itemRouter.post("/:id/update", requireAdmin, updateItem);
itemRouter.post("/:id/updateQuantity", requireAdmin, updateItemQuantity);
itemRouter.delete("/:id", requireAdmin, deleteItem);

export { itemRouter };
