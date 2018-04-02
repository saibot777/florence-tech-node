import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate');

const textSchema = new Schema({
    text: {
        type: String,
        minlength: 12,
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

textSchema.plugin(paginate);

const Text = mongoose.model('Text', textSchema);

export default Text;