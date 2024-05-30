import express from "express";
import { UserController } from "../../../controllers/UserController";
import { validationMiddleware } from "../../../middlewares/validationMiddleware";
import { CreateUserDTO } from "../../../controllers/dtos/users_dto/createUser.dto";
const Router = express.Router()
const userController = new UserController()

Router.post('/create', validationMiddleware(CreateUserDTO), userController.createUser)

export default Router;