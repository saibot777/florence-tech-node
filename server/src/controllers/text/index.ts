import { Request, Response } from 'express-serve-static-core';
import Text from "../../models/text";
import Issue from "../../models/issue";

exports.create = (req: Request, res: Response) => {
    let issue: any;
    let text: any;

    Issue.findOne({ _id: req.params.issueId })
        .then(newIssue => {
            issue = newIssue;

            return Text.create({
                text: req.body.text,
                issue: req.params.issueId
            });
        })
        .then(newText => {
            text = newText;
            issue.text.push(text);

            return issue.save();
        })
        .then(() => res.status(201).json(text))
        .catch(err => {
            console.log(err);
            if (err.errors) {
                if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'minlength') {
                    res.status(400).json({ message: 'Validation Error: text is too long (12 characters minimum)' });
                    return;
                } else if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'required') {
                    res.status(400).json({ message: 'Validation Error: text cannot be blank' });
                    return;
                }
            }
            res.sendStatus(500);
        });
};

exports.textList = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    Text.paginate({ issue: req.params.issueId }, {
        page: page,
        limit: limit
    })
        .then(text => {
            res.set({
                'X-Total-Count': text.total,
                'X-Total-Pages': text.pages,
                'X-Current-Page': text.page
            });

            res.status(200).json(text.docs);
        })
        .catch(() => res.sendStatus(500));
};