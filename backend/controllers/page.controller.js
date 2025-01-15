import Page from '../models/page.model.js';

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

export const getPagesByDomain = async (req, res) => {
    try {
      const { domainId } = req.params;
      const pages = await Page.find({ domain: domainId }).populate('domain');
      if (!pages.length) {
        return res.status(404).json({ 
            success:true,
            message: 'No pages found for this domain' ,
            data:[]
        });
      }
      res.status(200).json({
        success:true,
        message:'Successfully get all pages',
        data:pages
    });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch pages', error: err.message });
    }
  };
