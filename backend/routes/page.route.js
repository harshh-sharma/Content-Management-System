import express from "express";
import {PageController} from "../controllers/index.js";
import { PageMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post('/',PageMiddleware.validateCreatePage, PageController.createPage);
router.get('/',PageMiddleware.validateGetPages,PageController.getPages);
router.get('/:id',PageMiddleware.validateGetPageById ,PageController.getPageById);
router.put('/:id',PageMiddleware.validateUpdatePage,PageController.updatePage);
router.delete('/:id',PageMiddleware.validateDeletePage,PageController.deletePage);

export default router;
