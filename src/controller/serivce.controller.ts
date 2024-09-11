import { Request, Response } from "express";
import ServiceModel from '../models/service.model';
import ProjectModel from '../models/project.model'; // Assuming projects are stored in this model
import { hashPassword, verifyPassword } from "../utils/hash.util";
import { createToken } from "../utils/token";

// Utility function to verify key and project existence
const verifyKeyAndProject = async (key: string, projectId: string) => {
    // Here you can validate the key or project based on your system logic
    const project = await ProjectModel.findOne({ _id: projectId, apiKey: key });
    return project !== null;
};

// Signup a new user in a specific project
export const signup = async (req: Request, res: Response) => {
    const { key, projectid } = req.params;

    // Verify if key and project ID are valid
    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    try {
        const { userdata } = req.body;
        userdata.password = await hashPassword(userdata.password);
        userdata.projectId = projectid;  // Associate user with the project

        const newUser = new ServiceModel(userdata);
        const savedUser = await newUser.save();

        const token: string = createToken(savedUser._id.toString());

        res.status(201).send({ user: savedUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while saving user' });
    }
};

// Login an existing user within a specific project
export const login = async (req: Request, res: Response) => {
    const { key, projectid } = req.params;

    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await ServiceModel.findOne({ email, projectId: projectid });
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

// Get a specific user by ID within a project
export const readOne = async (req: Request, res: Response) => {
    const { key, projectid, id } = req.params;

    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    try {
        const user = await ServiceModel.findOne({ _id: id, projectid: projectid });
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching user data');
    }
};

// Get all users for a specific project
export const readAll = async (req: Request, res: Response) => {
    const { key, projectid } = req.params;

    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    try {
        const fetchedUsers = await ServiceModel.find({ projectid: projectid });
        res.status(200).send(fetchedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching user data');
    }
};

// Update a user by ID within a project
export const updateOne = async (req: Request, res: Response) => {
    const { key, projectid, id } = req.params;

    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    try {
        const { newData } = req.body;

        const updatedUser = await ServiceModel.findOneAndUpdate(
            { _id: id, projectid: projectid },
            newData,
            { new: true }
        );
        if (!updatedUser) return res.status(404).send('User not found');

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while updating profile');
    }
};

// Delete a user by ID within a project
export const deleteOne = async (req: Request, res: Response) => {
    const { key, projectid, id } = req.params;

    if (!await verifyKeyAndProject(key, projectid)) {
        return res.status(403).send({ message: 'Invalid project ID or key' });
    }

    try {
        const deletedUser = await ServiceModel.findOneAndDelete({ _id: id, projectid: projectid });
        if (!deletedUser) return res.status(404).send('User not found');

        res.status(200).send(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while deleting profile');
    }
};
