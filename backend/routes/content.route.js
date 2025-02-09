import express from "express";
import {ContentController} from "../controllers/index.js";
import { ContentMiddleware, UserMiddleware } from "../middlewares/index.js";
import upload from "../config/cloudinary.config.js";

const router = express.Router();
console.log("req is coming in routes");


router.post('/',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateCreateContent,upload.single("file"),ContentController.createContent);

router.get('/',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateCreateContent ,ContentController.getContents);
router.get('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateGetContentById ,ContentController.getContentById);
router.put('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,upload.single("file") ,ContentController.updateContent);
router.delete('/:id',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentMiddleware.validateDeleteContent ,ContentController.deleteContent);

router.get('/:id/contents',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,ContentController.getContentsRelatedToSection);

export default router;
