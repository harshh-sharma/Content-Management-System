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
        image_url: { type: String },
        public_id: { type: String } // Store the public_id from Cloudinary here
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

const Content = mongoose.model('Content', ContentSchema);

export default Content;
