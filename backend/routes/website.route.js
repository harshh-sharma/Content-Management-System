import {Router} from "express";
import { WebsiteController } from "../controllers/index.js";

const websiteRouter = Router();

websiteRouter.get('/:id',WebsiteController.getWebsiteContent);

export default websiteRouter;