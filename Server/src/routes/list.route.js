import { Router } from "express";
import { category } from "../controller/list.controller.js";

const listrouter = Router();

listrouter.post("/category", category);

export default listrouter;
