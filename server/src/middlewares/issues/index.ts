import * as _ from "lodash"
const compose = require('composable-middleware');
import { Request, Response, NextFunction } from 'express-serve-static-core';

const params: any = [
    'status'
];
const values: any = {
    status: [
        'pending',
        'complete'
    ]
};

const verifiedParams = (req: Request, res: Response, next: NextFunction) => {
    req.body = _.pick(req.body, params);
    next();
};

const verifiedValues = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.status && !values.status.includes(req.body.status)) {
        res.status(400).json({ message: 'Invalid Value' });
    } else {
        next();
    }
};

export const verify = () => {
    return compose()
        .use(verifiedParams)
        .use(verifiedValues);
};