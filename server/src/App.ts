import * as express from "express";
import { Request, Response } from 'express-serve-static-core';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';
import {env} from "./config/development";

// Create Express server
const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.connect(env.mongoURI, {useMongoClient: true}).then(
    () => {
        console.log('Connected MongoDB');
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: 'Welcome'
    });
});


export default app;