import mongoose ,{Schema} from "mongoose";

const PageSchema = new Schema({
    domain_id: {
        type: Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Page', PageSchema);
