import { Request, Response, NextFunction } from 'express-serve-static-core';
import Issue from "../models/issue";

export const verifyIssue = (req: Request, res: Response, next: NextFunction) => {
    Issue.findOne({ _id: req.params.issueId })
        .then(issue => {
            if (!issue) {
                res.status(400).json({ message: 'Issue does not exist' });
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            if (err.kind === 'ObjectId' && err.name === 'CastError') {
                res.status(400).json({ message: 'Issue does not exist' });
                return;
            }
            res.sendStatus(500);
        });
};