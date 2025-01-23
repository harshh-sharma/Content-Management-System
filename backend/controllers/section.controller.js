import Section from '../models/section.model.js';
import { StatusCodes } from 'http-status-codes';

// Create a new section
export const createSection = async (req, res) => {
    try {
        const section = new Section(req.body);
        const newSection = await section.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Section created successfully',
            data: newSection
        });
    } catch (error) {
        console.error("Error creating section:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while creating the section'
        });
    }
};

// Get all sections
export const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved sections',
            data: sections
        });
    } catch (error) {
        console.error("Error fetching sections:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while fetching sections'
        });
    }
};

// Get a section by ID
export const getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Section not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved section',
            data: section
        });
    } catch (error) {
        console.error("Error fetching section by ID:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while fetching the section'
        });
    }
};

// Update a section by ID
export const updateSection = async (req, res) => {
    try {
        const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSection) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Section not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Section updated successfully',
            data: updatedSection
        });
    } catch (error) {
        console.error("Error updating section:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while updating the section'
        });
    }
};

// Delete a section by ID
export const deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);
        if (!deletedSection) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Section not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Section deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while deleting the section'
        });
    }
};
