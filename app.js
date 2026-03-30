import express, { json } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { indexRouter } from "./routes/indexRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { itemRouter } from "./routes/itemRouter.js";
import session from "express-session";
import { loginRouter } from "./routes/loginRouter.js";
import { signUpRouter } from "./routes/signUpRouter.js";
import passport from "passport";
import { logout } from "./controllers/loginController.js";
import cors from "cors";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOriginsFromEnv = process.env.CORS_ORIGINS?.trim() ?? "";

const allowAllOrigins = corsOriginsFromEnv === "*";

const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://project.sushilneupane.com.np",
  "http://project.sushilneupane.com.np",
  ...(allowAllOrigins ? [] : corsOriginsFromEnv.split(",").map(o => o.trim()).filter(Boolean)),
]);

app.use(express.json()); //this is used to parse the JSON being sent from the client
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin(origin, callback) {
      if (allowAllOrigins) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      callback(null, false);
    },
    credentials: true,
  }),
);

app.use(
  session({
    secret: "test_cat",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//middleware to the specific routes

app.use("/api", indexRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logout);
app.use("/api/signup", signUpRouter);

//view engine setup
app.set("views", path.join(__dirname, "views")); // Corrected path.join
app.set("view engine", "ejs");

//session
// app.use(passport.initialize());
// app.use(passport.session())

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"express app-listening on port ${PORT}"`);
});
