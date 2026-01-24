import { Router } from "express";
import {
  getAllTheItems,
  addItem,
  deleteItem,
  updateItem,
  updateItemQuantity,
} from "../controllers/itemController.js";

const itemRouter = Router();

itemRouter.get("/", getAllTheItems);
itemRouter.post("/add", addItem);
itemRouter.post("/update", updateItem);
itemRouter.post("/updateQuantity", updateItemQuantity);
itemRouter.post("/:id", deleteItem);

export { itemRouter };
