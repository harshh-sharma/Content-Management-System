import express from "express";
import { SectionController } from "../controllers/index.js";
import { SectionMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post('/',SectionMiddleware.validateCreateSection ,SectionController.createSection);
router.get('/',SectionMiddleware.validateGetSections,SectionController.getSections);
router.get('/:id',SectionMiddleware.validateGetSectionById,SectionController.getSectionById);
router.put('/:id',SectionMiddleware.validateUpdateSection ,SectionController.updateSection);
router.delete('/:id',SectionMiddleware.validateDeleteSection,SectionController.deleteSection);

router.get('/:id/sections',SectionController.getSectionsByPages);

export default router;
