import User from "../models/user.model.js"
// Create a new user
export const createUser = async (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(newUser => res.json(newUser))
        .catch(err => res.status(400).json(err));
};


export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const isUserExist = await User.findOne({email}).select('+password');

        if(!isUserExist){
            return res.status(400).json({
                success:false,
                message:"user are not found"
            })
        }

        const isPasswordCorrect = await isUserExist.correctPassword(password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"invalid Password"
            })
        }

        const token = await isUserExist.generateJWTToken();

        if(!token){
            return res.status(500).json({
                success:false,
                message:'Something went wrong Please try again'
            })
        }

        return res.status(200).json({
            success:true,
            message:"User successfully loggedIn",
            token
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

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
