import express from "express";
import {PageController} from "../controllers/index.js";
import { PageMiddleware, UserMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.use(UserMiddleware.isUserAuthenticated);
router.use(UserMiddleware.isUserAuthorizied);

router.post('/',PageMiddleware.validateCreatePage, PageController.createPage);
router.get('/',PageMiddleware.validateGetPages,PageController.getPages);
router.get('/:id',PageMiddleware.validateGetPageById ,PageController.getPageById);
router.put('/:id',PageMiddleware.validateUpdatePage,PageController.updatePage);
router.delete('/:id',PageMiddleware.validateDeletePage,PageController.deletePage);

router.get('/:id/pages',PageController.getPagesByDomain);

router.get('/:id/sections',PageController.getSectionsByPages);

export default router;
