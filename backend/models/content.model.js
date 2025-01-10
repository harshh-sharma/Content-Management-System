import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    section_id: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    content_type: {
        type: String,
        enum: ['text', 'image', 'text_and_image'],
        required: true
    },
    content_data: {
        text: { type: String },
        image_url: { type: String }
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

module.exports = mongoose.model('Content', ContentSchema);
