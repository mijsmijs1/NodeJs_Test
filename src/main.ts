import 'reflect-metadata';
import ApiRouter from './routes'
import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { seed } from './models/user_model/User.seed';
dotEnv.config()
AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json())
        app.use(cors())
        app.use('/api', ApiRouter)
        app.listen(8000, () => {
            console.log(`Sever on: ${process.env.SEVER_HOST}:${process.env.SEVER_PORT}`);
        })
        seed();
    })
    .catch(error => console.log('Error during Data Source initialization:', error))
