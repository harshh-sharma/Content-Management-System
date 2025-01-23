import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";

// Create a new user
export const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'User already registered',
        });
      }
  
      const user = new User({ name, email, password });
      await user.save();

      const token = await user.generateJWTToken();
  
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'User successfully registered',
        role:user?.role,
        data: user,
        token
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'An error occurred while creating the user',
      });
    }
};
  
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email }).select("+password");

    if (!isUserExist) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await isUserExist.correctPassword(password);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await isUserExist.generateJWTToken();

    if (!token) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong. Please try again",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User successfully logged in",
      user: isUserExist,
      role: isUserExist?.role,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred during login',
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully retrieved all users',
      data: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while fetching users',
    });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully retrieved user',
      data: user
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while fetching the user',
    });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found or update failed",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User successfully updated',
      data: user
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while updating the user',
    });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User successfully deleted'
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while deleting the user',
    });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const isUserExist = await User.findById(id);
    if (!isUserExist) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to update user role',
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User role successfully updated',
      data: user
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while updating user role',
    });
  }
};
