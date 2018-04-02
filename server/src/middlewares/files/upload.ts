import { Request, Response, NextFunction } from 'express-serve-static-core';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../temp/');
    },
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

const upload = multer({
    storage: storage
}).single('file');

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
        console.log(req.file);
        if(err){
            res.json({error_code:1, err_desc:err});
            return;
        }
        res.json({error_code:0, err_desc:null});

    });
};