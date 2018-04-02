import { Request, Response } from 'express-serve-static-core';
const path = require('path');
import * as _ from "lodash"
import File from "../../models/file";
import Issue from "../../models/issue";
const env = require('../../config/development');

exports.upload = (req: Request, res: Response) => {
    let issue: any;

    Issue.findOne({ _id: req.params.issueId })
        .then(newIssue => {
            issue = newIssue;
            let filesToCreate = _.map((<any>req).files, file => {
                return {
                    path: file.filename,
                    issue: issue._id
                };
            });

            return File.create(filesToCreate);
        })
        .then(createdFiles => {
            _.each(createdFiles, createdFile => {
                issue.files.push(createdFile);
            });

            return issue.save();
        })
        .then(issue => {
            res.status(200).json(issue);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
};

exports.download = (req: Request, res: Response) => {
    File.findOne({ _id: req.params.id })
        .then(file => {
            if (!file) {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            console.log(file);
            res.sendFile(path.join(__dirname, '../../../../' + env.TEMP, (<any>file).path));
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
};

