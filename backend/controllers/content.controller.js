import { StatusCodes } from 'http-status-codes';
import Content from '../models/content.model.js';
import cloudinary from "cloudinary";

// Create content
export const createContent = async (req, res) => {
    try {
        console.log("--req body--", req.body); // Text fields
        console.log("--req file--", req.file); // Uploaded file details

        const contentData = {
            section_id: req.body.section_id,
            content_type: req.body.content_type,
            content_data: {
                text: req.body.text,
                image_url: null,
                public_id: null
            }
        };

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            if (result) {
                contentData.content_data.image_url = result.secure_url;
                contentData.content_data.public_id = result.public_id;
            }
        }

        const content = new Content(contentData);
        await content.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully created content',
            data: content
        });
    } catch (error) {
        console.error("Error creating content:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while creating content'
        });
    }
};

// Get all content
export const getContents = async (req, res) => {
    try {
        const contents = await Content.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved contents',
            data: contents
        });
    } catch (error) {
        console.error("Error fetching contents:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while fetching contents'
        });
    }
};

// Get content by ID
export const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Content not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved content',
            data: content
        });
    } catch (error) {
        console.error("Error fetching content by ID:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while fetching content'
        });
    }
};

// Update content by ID
export const updateContent = async (req, res) => {
    try {
        const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContent) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Content not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated content',
            data: updatedContent
        });
    } catch (error) {
        console.error("Error updating content:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while updating content'
        });
    }
};

// Delete content by ID
export const deleteContent = async (req, res) => {
    try {
        const deletedContent = await Content.findByIdAndDelete(req.params.id);
        if (!deletedContent) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Content not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Content deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting content:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while deleting content'
        });
    }
};

// Get contents related to a section
export const getContentsRelatedToSection = async (req, res) => {
    try {
        const { id } = req.params;
        const contents = await Content.find({ section_id: id });
        if (!contents || contents.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'No contents found for the specified section',
                data: []
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved contents',
            data: contents
        });
    } catch (error) {
        console.error("Error fetching contents related to section:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while fetching contents related to the section',
            data: []
        });
    }
};
