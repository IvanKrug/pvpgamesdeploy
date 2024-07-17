import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;
        const passwordHash = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password: passwordHash, name, role });
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password, name, role },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
