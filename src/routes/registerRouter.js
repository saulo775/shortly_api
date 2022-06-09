import { Router } from "express";

import { saveNewUser, signIn } from "../controllers/registerController.js";
import { validateNewUser } from "../middlewars/validateNewUser.js";
import { validateSignInUser } from "../middlewars/validateSignInUser.js";


const registerRouter = Router();

registerRouter.post("/signup", validateNewUser, saveNewUser);
registerRouter.post("/signin", validateSignInUser, signIn);

export default registerRouter;