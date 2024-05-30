import express from "express";
import { UserController } from "../../../controllers/UserController";
import { validationMiddleware } from "../../../middlewares/validationMiddleware";
import { CreateUserDTO } from "../../../controllers/dtos/users_dto/createUser.dto";
import { UpdateUserDTO } from "../../../controllers/dtos/users_dto/updateUser.dto";
const Router = express.Router()
const userController = new UserController()

Router.post('/create', validationMiddleware(CreateUserDTO), userController.createUser)
Router.get('/findById/:id', userController.getUserById)
Router.patch('/update/:id', validationMiddleware(UpdateUserDTO), userController.update)
Router.delete('/delete/:id', userController.deleteById)

export default Router;