import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

const Section = mongoose.model('Section', SectionSchema);

export default Section;
