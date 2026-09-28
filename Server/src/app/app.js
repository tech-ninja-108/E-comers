import express from "express";
import router from "../routes/user.router.js";
import cookiesparser from "cookie-parser";
import productRouter from "../routes/product.route.js";
import listrouter from "../routes/list.route.js";

const app = express();
app.use(express.json());
app.use(cookiesparser());

app.use("/api/auth", router);
app.use("/api", productRouter);
app.use("/", listrouter);

export default app;
