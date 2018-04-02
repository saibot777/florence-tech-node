const compose = require('composable-middleware');
import {verifyIssue} from "../../helpers";

export const getText = () => compose().use(verifyIssue);

export const createText = () => compose().use(verifyIssue);