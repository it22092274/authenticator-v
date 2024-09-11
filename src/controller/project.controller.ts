import { Request, Response } from "express";
import projectModel from "../models/project.model";
import { generateKey } from "../utils/apiKey";

// Create a project
export const createProject = async (req: Request, res: Response) => {
    try {
        const { userid, projectname, collaborator } = req.body;
        const newProject = new projectModel({ userid, projectname, collaborator });

        const savedProject = await newProject.save();
        const key = generateKey();

        res.status(201).send({ project: savedProject, key });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while creating project' });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;

        const deletedProject = await projectModel.findByIdAndDelete(projectId);

        if (!deletedProject) return res.status(404).send('Project not found');

        res.status(200).send({ message: 'Project deleted successfully', project: deletedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while deleting project' });
    }
};

// Add a collaborator
export const addCollaborator = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const { collaboratorId } = req.body;

        const project = await projectModel.findById(projectId);
        if (!project) return res.status(404).send('Project not found');

        project.collaborator.push(collaboratorId);
        const updatedProject = await project.save();

        res.status(200).send({ message: 'Collaborator added successfully', project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while adding collaborator' });
    }
};
// Add a collaborator
export const getCollaborators = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;

        const project = await projectModel.findById(projectId);
        if (!project) return res.status(404).send('Project not found');

        res.status(200).send({ message: 'Collaborator fetched successfully', collaborators: project.collaborator });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while adding collaborator' });
    }
};

// Remove a collaborator
export const removeCollaborator = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const { collaboratorId } = req.body;

        const project = await projectModel.findById(projectId);
        if (!project) return res.status(404).send('Project not found');

        project.collaborator = project.collaborator.filter(
            (collab) => collab.toString() !== collaboratorId
        );

        const updatedProject = await project.save();

        res.status(200).send({ message: 'Collaborator removed successfully', project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while removing collaborator' });
    }
};

// Read all projects for a user
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { userid } = req.params;

        const projects = await projectModel.find({ userid });
        if (!projects.length) return res.status(404).send('No projects found for this user');

        res.status(200).send({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while fetching projects' });
    }
};

// Read a single project
export const getProject = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;

        const project = await projectModel.findById(projectId);
        if (!project) return res.status(404).send('Project not found');

        res.status(200).send({ project });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error occurred while fetching project' });
    }
};
