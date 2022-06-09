import express from "express";
import { Router } from "express";

import registerRouter from "./registerRouter.js";
import urlsRouter from "./urlsRouter.js";

const router = Router();

router.use(registerRouter);
router.use(urlsRouter);

export default router;