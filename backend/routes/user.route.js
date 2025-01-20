import express from "express";
import { UserController } from "../controllers/index.js";
import { UserMiddleware } from "../middlewares/index.js";

const router = express.Router();


router.post('/register',UserMiddleware.validateCreateUser, UserController.createUser);
router.post('/login',UserController.loginUser);
router.get('/',UserMiddleware.isUserAuthenticated,UserMiddleware.isUserAuthorizied,UserMiddleware.validateGetUsers,UserController.getUsers);
router.get('/:id',UserMiddleware.isUserAuthorizied,UserMiddleware.isUserAuthenticated,UserMiddleware.validateGetUserById,UserController.getUserById);
router.put('/:id',UserMiddleware.isUserAuthorizied,UserMiddleware.isUserAuthenticated,UserMiddleware.validateUpdateUser,UserController.updateUser);
router.delete('/:id',UserMiddleware.isUserAuthorizied,UserMiddleware.isUserAuthenticated,UserMiddleware.validateDeleteUser,UserController.deleteUser);

export default router;
