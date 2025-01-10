import express from "express";
import { SectionController } from "../controllers";

const router = express.Router();

router.post('/', SectionController.createSection);
router.get('/', SectionController.getSections);
router.get('/:id', SectionController.getSectionById);
router.put('/:id', SectionController.updateSection);
router.delete('/:id', SectionController.deleteSection);

export default router;
