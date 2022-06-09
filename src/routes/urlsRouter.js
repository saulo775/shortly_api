import { Router } from "express";

import { shortenURL } from "../controllers/urlsController.js";
import authMiddleware from "../middlewars/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authMiddleware, shortenURL);

export default urlsRouter;