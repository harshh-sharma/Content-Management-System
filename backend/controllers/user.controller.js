const User = require('../models/User');

// Create a new user
export const createUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(newUser => res.json(newUser))
        .catch(err => res.status(400).json(err));
};

// Get all users
export const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
};

// Get a user by ID
export const getUserById = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
};

// Update a user by ID
export const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
};

// Delete a user by ID
export const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
