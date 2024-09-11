import express from 'express';
import { deleteOne, login, readAll, readOne, signup, updateOne } from '../controller/serivce.controller';

const router = express.Router();

// Routes use key and projectId as part of the path
router.post('/service/:key/signup/:projectid', signup);
router.post('/service/:key/login/:projectid', login);
router.get('/service/:key/readone/:projectid/:id', readOne);  // Added :id for specific user
router.get('/service/:key/readall/:projectid', readAll);
router.put('/service/:key/update/:projectid/:id', updateOne);  // Added :id for specific user
router.delete('/service/:key/delete/:projectid/:id', deleteOne);  // Added :id for specific user

export default router;
