import { Request, Response } from "express";
import UserModel from '../models/users.model';
import { hashPassword, verifyPassword } from "../utils/hash.util";
import { createToken } from "../utils/token";

// Signup a new user
export const signup = async (req: Request, res: Response) => {
    try {
        const { userdata } = req.body;

        // Hash the password asynchronously
        userdata.password = await hashPassword(userdata.password);

        // Create a new user with the provided data
        const newUser = new UserModel(userdata);
        const savedUser = await newUser.save();

        // Create JWT token
        const token: string = createToken(savedUser._id.toString());

        res.status(201).send({ user: savedUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while saving user' });
    }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return res.status(404).send('No user found');

        const authenticate = await verifyPassword(password, existingUser.password);
        if (!authenticate) return res.status(401).send('Email or password is incorrect');

        const token = createToken(existingUser._id.toString());

        res.status(200).send({ user: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching user data');
    }
};

// Fetch a specific user by ID
export const readOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching user data');
    }
};

// Fetch all users
export const readAll = async (req: Request, res: Response) => {
    try {
        const fetchedUsers = await UserModel.find();
        res.status(200).send(fetchedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching user data');
    }
};

// Update a specific user by ID
export const updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedUser) return res.status(404).send('User not found');

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while updating profile');
    }
};

// Delete a specific user by ID
export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).send('User not found');

        res.status(200).send({ message: 'User successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while deleting profile');
    }
};
