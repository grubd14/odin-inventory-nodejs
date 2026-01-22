import { Router } from "express";
import  {getAllTheItems, addItem, deleteItem, updateItem, updateItemQuantity } from "../controllers/itemController.js";

const itemRouter =  Router()

itemRouter.get('/', getAllTheItems)
itemRouter.post('/:name/:descp/:quantity/:category_id',addItem)
itemRouter.post('/:id/:category_id/:name/:description/:quantity',updateItem)
itemRouter.post('/:id/:updatedQuantity',updateItemQuantity)
itemRouter.post('/:id',deleteItem)

export { itemRouter }