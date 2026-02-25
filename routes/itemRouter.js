import { Router } from "express";
import {
  getAllTheItems,
  addItem,
  deleteItem,
  updateItem,
  updateItemQuantity,
  getItemById,
} from "../controllers/itemController.js";

const itemRouter = Router();

itemRouter.get("/", getAllTheItems);
itemRouter.get("/:id", getItemById);
itemRouter.post("/add", addItem);
itemRouter.post("/:id/update", updateItem);
itemRouter.post("/:id/updateQuantity", updateItemQuantity);
itemRouter.delete("/:id", deleteItem);

export { itemRouter };
