import { Router } from "express";

import authMiddleware from "../middlewars/authMiddleware.js";
import { getAllUrlsUser } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", authMiddleware, getAllUrlsUser);

export default usersRouter;