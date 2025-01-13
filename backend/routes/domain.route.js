import express from "express";

import { DomainController } from "../controllers/index.js";
import {DomainMiddleware} from "../middlewares/index.js"

const router = express.Router();

router.post("/domains", DomainMiddleware.validateCreateDomain, DomainController.createDomain); // Create domain
router.get("/domains", DomainMiddleware.validateGetDomains, DomainController.getDomains); // Get all domains
router.get("/domains/:id", DomainMiddleware.validateGetDomainById, DomainController.getDomainById); // Get domain by ID
router.put("/domains/:id", DomainMiddleware.validateUpdateDomain, DomainController.updateDomain); // Update domain by ID
router.delete("/domains/:id", DomainMiddleware.validateDeleteDomain, DomainController.deleteDomain); // Delete domain by ID

export default router;
