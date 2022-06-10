import express from "express";
import { Router } from "express";

import registerRouter from "./registerRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";


const router = Router();

router.use(registerRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;