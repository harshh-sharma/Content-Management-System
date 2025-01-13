import express from "express";
import { DomainController } from "../controllers/index.js";
import { DomainMiddleware, UserMiddleware } from "../middlewares/index.js";

const router = express.Router();

// Public route: No authentication/authorization required
router.route('/').get(
  DomainMiddleware.validateGetDomains,
  DomainController.getDomains
);

// Middleware for authentication and authorization
// This will apply to all routes defined below it
router.use(UserMiddleware.isUserAuthenticated);
router.use(UserMiddleware.isUserAuthorizied);

// Protected routes: Authentication/authorization required
router
  .route("/")
  .post(DomainMiddleware.validateCreateDomain, DomainController.createDomain);

router
  .route("/:id")
  .get(DomainMiddleware.validateGetDomainById, DomainController.getDomainById)
  .put(DomainMiddleware.validateUpdateDomain, DomainController.updateDomain)
  .delete(DomainMiddleware.validateDeleteDomain, DomainController.deleteDomain);

export default router;
