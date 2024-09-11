import express from 'express'
import { addCollaborator, createProject, deleteProject, getAllProjects, getCollaborators, getProject, removeCollaborator } from '../controller/project.controller'

const router = express.Router()

router.post('/project/create', createProject)
router.post('/project/delete', deleteProject)
router.post('/project/addcollab', addCollaborator)
router.get('/project/getcollab', getCollaborators)
router.get('/project/getallproj', getAllProjects)
router.get('/project/getproj', getProject)
router.delete('/project/removecollab', removeCollaborator)

export default router