import { StatusCodes } from 'http-status-codes';
import Page from '../models/page.model.js';
import Section from '../models/section.model.js';

// Create a new page
export const createPage = (req, res) => {
    const {domain_id,title,slug} = req.body;
try {
        const page = new Page({domain_id,title,slug});
        page.save();
        
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'successfully page created',
            data:page
        })
} catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:error.message,
        data:[]
    })
}
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
      const { id } = req.params;
      
      const pages = await Page.find({ domain_id : id });
  
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

  export const getSectionsByPages = async (req, res) => {
    try {
      const { id } = req.params;
      
      const sections = await Section.find({ page_id : id });
  
      if (!sections.length) {
        return res.status(404).json({ 
            success:true,
            message: 'No section found for this page' ,
            data:[]
        });
      }
      res.status(200).json({
        success:true,
        message:'Successfully get all sections',
        data:sections
    });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch pages', error: err.message });
    }
  };
