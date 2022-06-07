import { Router } from "express";

import { saveNewUser } from "../controllers/registerController.js";


const registerRouter = Router();

registerRouter.post("/signup", saveNewUser);

export default registerRouter;