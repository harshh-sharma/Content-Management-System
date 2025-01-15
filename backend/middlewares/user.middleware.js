import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";

const validateCreateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: "Name is required" });
    }

    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ error: "Valid email is required" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password should be at least 6 characters long" });
    }

    next();
};

const validateGetUserById = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    next();
};


const validateUpdateUser = (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validate user ID
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Validate fields if present
    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        return res.status(400).json({ error: "Name cannot be empty" });
    }

    if (email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ error: "Valid email is required" });
    }

    if (password && password.length < 6) {
        return res.status(400).json({ error: "Password should be at least 6 characters long" });
    }

    next();
};


const validateDeleteUser = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    next();
};

const validateGetUsers = (req, res, next) => {
    const { page, limit } = req.query;

    if (page && (isNaN(page) || page <= 0)) {
        return res.status(400).json({ error: "Page must be a positive integer" });
    }

    if (limit && (isNaN(limit) || limit <= 0)) {
        return res.status(400).json({ error: "Limit must be a positive integer" });
    }

    next();
};

const isUserAuthenticated = async (req, res, next) => {
    console.log('res--ss',req.headers);
    
    const token = req.headers['x-access-token'];
    console.log("token--=",token);
    
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'User is not authenticated'
        });
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please log in again.'
            });
        }

        return res.status(400).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};

const isUserAuthorizied = async (req, res ,next) => {
    const  user  = req.user;
    const findUser = await User.findById(user.id);
 
    if(findUser.role !== 'ADMIN'){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:"user is not authorized"
        })
    }

    next();
}

export {
    validateCreateUser,
    validateGetUsers,
    validateGetUserById,
    validateUpdateUser,
    validateDeleteUser,
    isUserAuthenticated,
    isUserAuthorizied
}

