import Content from '../models/content.model.js';

// Create content
export const createContent = (req, res) => {
    const content = new Content(req.body);
    content.save()
        .then(newContent => res.json(newContent))
        .catch(err => res.status(400).json(err));
};

// Get all content
export const getContents = (req, res) => {
    Content.find()
        .then(contents => res.json(contents))
        .catch(err => res.status(400).json(err));
};

// Get content by ID
export const getContentById = (req, res) => {
    Content.findById(req.params.id)
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err));
};

// Update content by ID
export const updateContent = (req, res) => {
    Content.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContent => res.json(updatedContent))
        .catch(err => res.status(400).json(err));
};

// Delete content by ID
export const deleteContent = (req, res) => {
    Content.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Content deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
