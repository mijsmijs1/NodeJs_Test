import express from "express";
import userApi from "./apis/user.apis"
const Router = express.Router()

Router.use('/users', userApi)

export default Router;