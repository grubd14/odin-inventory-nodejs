import { Router } from "express";
import  getAllTheItems from "../controllers/itemController.js";

const itemRouter =  Router()

itemRouter.get('/', getAllTheItems)

export { itemRouter }