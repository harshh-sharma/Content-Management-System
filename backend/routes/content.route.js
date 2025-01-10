import express from "express";
import {ContentController} from "../controllers";
import { ContentMiddleware } from "../middlewares";

const router = express.Router();

router.post('/', ContentMiddleware.validateCreateContent ,ContentController.createContent);
router.get('/', ContentMiddleware.validateCreateContent ,ContentController.getContents);
router.get('/:id', ContentMiddleware.validateGetContentById ,ContentController.getContentById);
router.put('/:id', ContentMiddleware.validateUpdateContent ,ContentController.updateContent);
router.delete('/:id', ContentMiddleware.validateDeleteContent ,ContentController.deleteContent);

export default router;
