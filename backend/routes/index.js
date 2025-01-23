import express from "express";

import UserRouter from "./user.route.js";
import DomainRouter from "./domain.route.js";
import ContentRouter from "./content.route.js";
import PageRouter from "./page.route.js";
import SectionRouter from "./section.route.js";
import websiteRouter from "./website.route.js";

const router = express.Router();

router.use("/user",UserRouter);
router.use("/domain",DomainRouter);
router.use("/page",PageRouter);
router.use("/section",SectionRouter);
router.use("/content",ContentRouter);
router.use("/website",websiteRouter);

export default router;


