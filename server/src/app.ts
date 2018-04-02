import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';
const issueCtr = require('./controllers/issues');
const textCtr = require('./controllers/text');
const filesCtr = require('./controllers/files');
import {verify} from "./middlewares/issues/index";
import {mongoURI} from "./config/development";
import {createText, getText} from "./middlewares/text";
const filesMiddleware = require('./middlewares/files');

/**
 *   Create Express server
 */
const app = express();


/**
*   Connect to MongoDB
*/
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoURI, {useMongoClient: true}).then(
    () => {
        console.log('Connected MongoDB');
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});


/**
 *   Data Models
 */
require("./models/issue");
require("./models/file");
require("./models/text");


/**
*   Express Configuration
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


/**
*   REST API
*/
app.post("/api/issues", verify(), issueCtr.create); // CREATE issue
app.get("/api/issues/:id", issueCtr.show); // GET single issue
app.get("/api/issues", issueCtr.issuesList); // CREATE issue
app.patch("/api/issues/:id", issueCtr.update); // UPDATE issue
app.delete("/api/issues/:id", issueCtr.remove); // DELETE issue

app.post("/api/issues/:issueId/text", createText(), textCtr.create); // CREATE text for specific issue
app.get("/api/issues/:issueId/text", getText(), textCtr.textList); // GET text from specific issue

app.post('/api/issues/:issueId/files', filesMiddleware.upload(), filesCtr.upload); // UPLOAD file
app.get('/api/issues/:issueId/files/:id', filesMiddleware.download(), filesCtr.download); // DOWNLOAD file

export default app;