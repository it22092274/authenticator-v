import express from 'express';
import { deleteOne, login, readAll, readOne, signup, updateOne } from '../controller/user.controller';

const router = express.Router();

// Define the routes with appropriate HTTP methods and route parameters
router.post('/user/signup', signup);
router.post('/user/login', login);
router.get('/user/readone/:id', readOne);  // Fetch a specific user by ID
router.get('/user/readall', readAll);      // Fetch all users
router.put('/user/update/:id', updateOne); // Update a specific user by ID
router.delete('/user/delete/:id', deleteOne); // Delete a specific user by ID

export default router;
