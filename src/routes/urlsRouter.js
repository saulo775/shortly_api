import { Router } from "express";

import { 
    shortenURL, 
    getUrlById, 
    redirectUrl 
} from "../controllers/urlsController.js";
import authMiddleware from "../middlewars/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authMiddleware, shortenURL);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);

export default urlsRouter;