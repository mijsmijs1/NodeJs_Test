import express from "express";
import { UserController } from "../../../controllers/UserController";
import { validationMiddleware } from "../../../middlewares/validationMiddleware";
import { CreateUserDTO } from "../../../controllers/dtos/users_dto/createUser.dto";
import { UpdateUserDTO } from "../../../controllers/dtos/users_dto/updateUser.dto";
import { LoginDTO } from "../../../controllers/dtos/auth_dto/login.dto";
import { AuthMiddleware } from "../../../middlewares/authMiddleware";

const Router = express.Router()
const userController = new UserController()
const authMiddleware = AuthMiddleware.getInstance();

Router.post('/login', validationMiddleware(LoginDTO), userController.login)
Router.post('/create', authMiddleware.tokenValidate, validationMiddleware(CreateUserDTO), userController.createUser)
Router.get('/findById/:id', authMiddleware.tokenValidate, userController.getUserById)
Router.patch('/update/:id', authMiddleware.tokenValidate, validationMiddleware(UpdateUserDTO), userController.update)
Router.delete('/delete/:id', authMiddleware.tokenValidate, userController.deleteById)

export default Router;