import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import File from "./file";
const paginate = require('mongoose-paginate');

const issueSchema = new Schema({
    status: {
        type: String,
        default: 'pending'
    },
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    text: [{
        type: Schema.Types.ObjectId,
        ref: 'Text'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

issueSchema.plugin(paginate);

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;