import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/", (request, response) => {
  response.send("Category Router");
});

export { categoryRouter };
