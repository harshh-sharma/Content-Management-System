import express from "express";
import {ContentController} from "../controllers/index.js";
import { ContentMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post('/', ContentMiddleware.validateCreateContent ,ContentController.createContent);
router.get('/', ContentMiddleware.validateCreateContent ,ContentController.getContents);
router.get('/:id', ContentMiddleware.validateGetContentById ,ContentController.getContentById);
router.put('/:id', ContentMiddleware.validateUpdateContent ,ContentController.updateContent);
router.delete('/:id', ContentMiddleware.validateDeleteContent ,ContentController.deleteContent);

export default router;
