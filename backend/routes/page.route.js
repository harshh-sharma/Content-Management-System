import express from "express";
import {PageController} from "../controllers";

const router = express.Router();

router.post('/', PageController.createPage);
router.get('/', PageController.getPages);
router.get('/:id', PageController.getPageById);
router.put('/:id', PageController.updatePage);
router.delete('/:id', PageController.deletePage);

export default router;
