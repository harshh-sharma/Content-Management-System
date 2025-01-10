import express from "express";
import {ContentController} from "../controllers";

const router = express.Router();

router.post('/', ContentController.createContent);
router.get('/', ContentController.getContents);
router.get('/:id', ContentController.getContentById);
router.put('/:id', ContentController.updateContent);
router.delete('/:id', ContentController.deleteContent);

export default router;
