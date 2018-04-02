import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    issue : [{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }]
});

const File = mongoose.model('File', fileSchema);
export default File;