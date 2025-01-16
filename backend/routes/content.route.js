import express from "express";
import {ContentController} from "../controllers/index.js";
import { ContentMiddleware, UserMiddleware } from "../middlewares/index.js";
import upload from "../config/cloudinary.config.js";

const router = express.Router();

router.post('/',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateCreateContent,upload.single("image"),ContentController.createContent);
router.get('/',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateCreateContent ,ContentController.getContents);
router.get('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateGetContentById ,ContentController.getContentById);
router.put('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateUpdateContent ,ContentController.updateContent);
router.delete('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateDeleteContent ,ContentController.deleteContent);

router.get('/:id/contents',ContentController.getContentsRelatedToSection);

export default router;
