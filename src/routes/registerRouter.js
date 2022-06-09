import { Router } from "express";

import { saveNewUser, signIn } from "../controllers/registerController.js";
import { validateNewUserMiddleware } from "../middlewars/validateNewUserMiddleware.js";
import { validateSignInUserMiddleware } from "../middlewars/validateSignInUserMiddleware.js";


const registerRouter = Router();

registerRouter.post("/signup", validateNewUserMiddleware, saveNewUser);
registerRouter.post("/signin", validateSignInUserMiddleware, signIn);

export default registerRouter;