import { StatusCodes } from 'http-status-codes';
import Domain from '../models/domian.model.js';
import Page from '../models/page.model.js';
import Section from '../models/section.model.js';
import Content from '../models/content.model.js';
import cloudinary from "cloudinary";

// Create a new domain
export const createDomain = async (req, res) => {
    try {
        console.log(req.body, req.user);

        const { id } = req.user;
        const domain = new Domain({ ...req.body, user_id: id });
        await domain.save();

        if (!domain) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Failed to create domain'
            });
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Domain successfully created',
            data: domain
        });

    } catch (error) {
        console.error("Error creating domain:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message || 'An error occurred while creating the domain'
        });
    }
};

// Get all domains
export const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved domains',
            data: domains
        });
    } catch (error) {
        console.error("Error fetching domains:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message || 'An error occurred while fetching domains'
        });
    }
};

// Get a domain by ID
export const getDomainById = async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Domain not found'
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully retrieved domain',
            data: domain
        });
    } catch (error) {
        console.error("Error fetching domain by ID:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message || 'An error occurred while fetching the domain'
        });
    }
};

// Update a domain by ID
export const updateDomain = async (req, res) => {
    try {
        const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedDomain) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Domain not found'
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Domain successfully updated',
            data: updatedDomain
        });
    } catch (error) {
        console.error("Error updating domain:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message || 'An error occurred while updating the domain'
        });
    }
};

// Delete a domain by ID
export const deleteDomain = async (req, res) => {
    const session = await Domain.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        // Find and delete the domain
        const deletedDomain = await Domain.findByIdAndDelete(id).session(session);
        if (!deletedDomain) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Domain not found',
            });
        }

        // Find all pages related to the domain
        const pages = await Page.find({ domain_id: id }).session(session);

        for (const page of pages) {
            // Find all sections related to each page
            const sections = await Section.find({ page_id: page._id }).session(session);

            for (const section of sections) {
                // Find all content related to each section
                const contents = await Content.find({ section_id: section._id }).session(session);

                for (const content of contents) {
                    // Delete associated images from Cloudinary
                    if (content.content_data?.public_id) {
                        await cloudinary.v2.uploader.destroy(content.content_data.public_id);
                    }

                    // Delete content
                    await Content.findByIdAndDelete(content._id).session(session);
                }

                // Delete the section
                await Section.findByIdAndDelete(section._id).session(session);
            }

            // Delete the page
            await Page.findByIdAndDelete(page._id).session(session);
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Domain and all related data successfully deleted',
        });
    } catch (error) {
        // Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession();
        console.error('Error deleting domain:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'An error occurred while deleting the domain',
        });
    }
};
