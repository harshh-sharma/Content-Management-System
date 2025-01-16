import Section from '../models/section.model.js';

// Create a new section
export const createSection = (req, res) => {
    const section = new Section(req.body);
    section.save()
        .then(newSection => res.json(newSection))
        .catch(err => res.status(400).json(err));
};

// Get all sections
export const getSections = (req, res) => {
    Section.find()
        .then(sections => res.json(sections))
        .catch(err => res.status(400).json(err));
};

// Get a section by ID
export const getSectionById = (req, res) => {
    Section.findById(req.params.id)
        .then(section => res.json(section))
        .catch(err => res.status(400).json(err));
};

// Update a section by ID
export const updateSection = (req, res) => {
    Section.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedSection => res.json(updatedSection))
        .catch(err => res.status(400).json(err));
};

// Delete a section by ID
export const deleteSection = (req, res) => {
    Section.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Section deleted successfully' }))
        .catch(err => res.status(400).json(err));
};

