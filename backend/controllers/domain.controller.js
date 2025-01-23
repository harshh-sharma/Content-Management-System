import { StatusCodes } from 'http-status-codes';
import Domain from '../models/domian.model.js';

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
    try {
        const deletedDomain = await Domain.findByIdAndDelete(req.params.id);

        if (!deletedDomain) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Domain not found'
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Domain successfully deleted'
        });
    } catch (error) {
        console.error("Error deleting domain:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message || 'An error occurred while deleting the domain'
        });
    }
};
