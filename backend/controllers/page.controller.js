import { StatusCodes } from 'http-status-codes';
import Page from '../models/page.model.js';
import Section from '../models/section.model.js';
import Content from '../models/content.model.js';
import cloudinary from "cloudinary"

// Create a new page
export const createPage = async (req, res) => {
  const { domain_id, title, slug } = req.body;

  try {
      // Create and save the new page
      const newPage = new Page({ domain_id, title, slug });
      await newPage.save();

      // Fetch all pages including the newly added one
      const pages = await Page.find({});

      // Send the response with all pages
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Successfully created the page',
          data: pages
      });
  } catch (error) {
      console.error("Error creating page:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while creating the page',
          data: []
      });
  }
};

// Get all pages
export const getPages = async (req, res) => {
  try {
      const pages = await Page.find();
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Successfully retrieved pages',
          data: pages
      });
  } catch (error) {
      console.error("Error fetching pages:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while fetching pages',
          data: []
      });
  }
};

// Get a page by ID
export const getPageById = async (req, res) => {
  try {
      const page = await Page.findById(req.params.id);
      if (!page) {
          return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              message: 'Page not found'
          });
      }
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Successfully retrieved page',
          data: page
      });
  } catch (error) {
      console.error("Error fetching page by ID:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while fetching the page'
      });
  }
};

// Update a page by ID
export const updatePage = async (req, res) => {
  try {
      const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPage) {
          return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              message: 'Page not found'
          });
      }
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Page updated successfully',
          data: updatedPage
      });
  } catch (error) {
      console.error("Error updating page:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while updating the page'
      });
  }
};

export const deletePage = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Step 1: Find the page and related sections and content
        const page = await Page.findById(id);
        if (!page) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Page not found'
            });
        }

        // Step 2: Find all sections related to the page
        const sections = await Section.find({ page_id: id });

        // Step 3: Delete associated content for each section and delete the content's image from Cloudinary
        for (let section of sections) {
            const content = await Content.find({ section_id: section._id });
            for (let cont of content) {
                // Delete the image from Cloudinary if it exists
                if (cont.content_data.public_id) {
                    await cloudinary.v2.uploader.destroy(cont.content_data.public_id);
                }

                // Delete the content
                await Content.findByIdAndDelete(cont._id);
            }

            // Step 4: Delete the section
            await Section.findByIdAndDelete(section._id);
        }

        // Step 5: Delete the page
        await Page.findByIdAndDelete(id);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Page and associated content, sections, and images deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting page:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while deleting the page'
        });
    }
};


// Get pages by domain ID
export const getPagesByDomain = async (req, res) => {
  try {
      const { id } = req.params;
      const pages = await Page.find({ domain_id: id });

      if (!pages.length) {
          return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              message: 'No pages found for this domain',
              data: []
          });
      }
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Successfully retrieved pages',
          data: pages
      });
  } catch (error) {
      console.error("Error fetching pages by domain:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while fetching pages',
          data: []
      });
  }
};

// Get sections by page ID
export const getSectionsByPages = async (req, res) => {
  try {
      const { id } = req.params;
      const sections = await Section.find({ page_id: id });

      if (!sections.length) {
          return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              message: 'No sections found for this page',
              data: []
          });
      }
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Successfully retrieved sections',
          data: sections
      });
  } catch (error) {
      console.error("Error fetching sections by page:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message || 'An error occurred while fetching sections',
          data: []
      });
  }
};
