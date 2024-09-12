import express from 'express';
import { deleteOne, login, readAll, readOne, signup, updateOne } from '../controller/user.controller';

const router = express.Router();

// Define the routes with appropriate HTTP methods and route parameters
router.post('/signup', signup);
router.post('/login', login);
router.get('/readone/:id', readOne);  // Fetch a specific user by ID
router.get('/readall', readAll);      // Fetch all users
router.put('/update/:id', updateOne); // Update a specific user by ID
router.delete('/delete/:id', deleteOne); // Delete a specific user by ID

export default router;
