import express from "express";
import {DomainController} from "../controllers";

const router = express.Router();

router.post('/', DomainController.createDomain);
router.get('/', DomainController.getDomains);
router.get('/:id', DomainController.getDomainById);
router.put('/:id', DomainController.updateDomain);
router.delete('/:id', DomainController.deleteDomain);

export default router;
