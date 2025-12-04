import { Router } from "express";

const itemRouter =  Router()

itemRouter.get('/', (request,response) => {
  response.send("Item Router")
})

export { itemRouter }