import express from "express";
import { SectionController } from "../controllers";
import { SectionMiddleware } from "../middlewares";

const router = express.Router();

router.post('/',SectionMiddleware.validateCreateSection ,SectionController.createSection);
router.get('/',SectionMiddleware.validateGetSections,SectionController.getSections);
router.get('/:id',SectionMiddleware.validateGetSectionById,SectionController.getSectionById);
router.put('/:id',SectionMiddleware.validateUpdateSection ,SectionController.updateSection);
router.delete('/:id',SectionMiddleware.validateDeleteSection,SectionController.deleteSection);

export default router;
