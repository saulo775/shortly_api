import { Router } from "express";

import { shortenURL, getUrlById } from "../controllers/urlsController.js";
import authMiddleware from "../middlewars/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authMiddleware, shortenURL);
urlsRouter.get("/urls/:id", getUrlById);

export default urlsRouter;