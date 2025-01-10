import { Schema } from "mongoose";

const SectionSchema = new Schema({
    page_id: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
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

module.exports = mongoose.model('Section', SectionSchema);
