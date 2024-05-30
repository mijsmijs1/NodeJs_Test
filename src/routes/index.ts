import express from "express";
import version_1 from './version_v1/index'
const Router = express.Router()

Router.use('/v1', version_1) 

export default Router;