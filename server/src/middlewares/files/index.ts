import {uploadFile} from "./upload";

const compose = require('composable-middleware');
import {verifyIssue} from "../../helpers";


exports.upload = () => compose().use(verifyIssue).use(uploadFile);

exports.download = () => compose().use(verifyIssue);
