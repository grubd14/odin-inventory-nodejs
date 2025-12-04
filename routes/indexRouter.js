import { response, Router } from "express";

const indexRouter =  Router()

indexRouter.get('/', (request,response) => {
  response.send("Index Router")
})

export {indexRouter}