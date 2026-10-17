import { Router } from "express";
import { category, getcategorys } from "../controller/list.controller.js";

const listrouter = Router();

listrouter.post("/category", category);
listrouter.get("/category", getcategorys);

export default listrouter;
