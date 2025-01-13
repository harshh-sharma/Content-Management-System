import express from "express";

import { DomainController } from "../controllers/index.js";
import { DomainMiddleware, UserMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.use(UserMiddleware.isUserAuthenticated);
router.use(UserMiddleware.isUserAuthorizied);

router
  .route("/")
  .post(DomainMiddleware.validateCreateDomain, DomainController.createDomain)
  .get(
    DomainMiddleware.validateGetDomains,
    DomainController.getDomains
  );

router
  .route("/:id")
  .get(DomainMiddleware.validateGetDomainById, DomainController.getDomainById)
  .put(DomainMiddleware.validateUpdateDomain, DomainController.updateDomain)
  .delete(DomainMiddleware.validateDeleteDomain, DomainController.deleteDomain);

export default router;
