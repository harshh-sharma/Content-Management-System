import Page from '../models/Page';

// Create a new page
export const createPage = (req, res) => {
    const page = new Page(req.body);
    page.save()
        .then(newPage => res.json(newPage))
        .catch(err => res.status(400).json(err));
};

// Get all pages
export const getPages = (req, res) => {
    Page.find()
        .then(pages => res.json(pages))
        .catch(err => res.status(400).json(err));
};

// Get a page by ID
export const getPageById = (req, res) => {
    Page.findById(req.params.id)
        .then(page => res.json(page))
        .catch(err => res.status(400).json(err));
};

// Update a page by ID
export const updatePage = (req, res) => {
    Page.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedPage => res.json(updatedPage))
        .catch(err => res.status(400).json(err));
};

// Delete a page by ID
export const deletePage = (req, res) => {
    Page.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Page deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
