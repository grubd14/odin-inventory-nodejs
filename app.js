import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { indexRouter } from "./routes/indexRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { itemRouter } from "./routes/itemRouter.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware to the specific routes
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"express app-listening on port ${PORT}"`);
});
