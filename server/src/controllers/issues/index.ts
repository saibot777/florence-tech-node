import { Request, Response } from 'express-serve-static-core';
import Issue from "../../models/issue";

exports.create = (req: Request, res: Response) => {
    Issue.create(req.body)
        .then(newIssue => {
            res.location(req.baseUrl + '/' + newIssue._id);

            res.status(201).json(newIssue);
        })
        .catch(() => res.sendStatus(500));
};

exports.show = (req: Request, res: Response) => {
    Issue.findOne({ _id: req.params.id })
        .populate(['files'])
        .then(issue => {
            if (!issue) {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.status(200).json(issue);
        })
        .catch(err => {
            console.log(err);
            if (err.kind === 'ObjectId' && err.name === 'CastError') {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.sendStatus(500);
        });
};

exports.issuesList = (req: Request, res: Response) => {
    Issue.paginate({}, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        populate: ['files']
    })
        .then(issues => {
            res.set({
                'X-Total-Count': issues.total,
                'X-Total-Pages': issues.pages,
                'X-Current-Page': issues.page
            });
            res.status(200).json(issues.docs);
        })
        .catch(() => res.status(500));
};

exports.remove = (req: Request, res: Response) => {
    Issue.findByIdAndRemove(req.params.id)
        .then(deletedIssue => {
            if (!deletedIssue) {
                res.status(404).json({ message: 'Not found' });
                return;
            }

            res.status(200).json({ message: 'Issue removed' });
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' && err.name === 'CastError') {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.sendStatus(500);
        });
};

exports.update = (req: Request, res: Response) => {
    Issue.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedIssue => {
            if (!updatedIssue) {
                res.status(404).json({ message: 'Not found' });
                return;
            }

            res.status(200).json(updatedIssue);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' && err.name === 'CastError') {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.sendStatus(500);
        });
};