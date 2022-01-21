import { Router } from 'express';
const infectedRouter = Router();
import { getInfectedPool, registerInfected } from '../controllers/infectedController';

// /api/infeteds/
// projectRouter.post('/', createProject);
// projectRouter.get('/', getProjects);
infectedRouter.get('/', getInfectedPool);
infectedRouter.get('/register', registerInfected);

export default infectedRouter;