import express from "express";
import { UserController } from "../controllers";
import { UserMiddleware } from "../middlewares";

const router = express.Router();


router.post('/',UserMiddleware.validateCreateUser, UserController.createUser);
router.get('/',UserMiddleware.validateGetUsers,UserController.getUsers);
router.get('/:id',UserMiddleware.validateGetUserById,UserController.getUserById);
router.put('/:id',UserMiddleware.validateUpdateUser,UserController.updateUser);
router.delete('/:id',UserMiddleware.validateDeleteUser,UserController.deleteUser);

export default router;
