import { Router } from 'express';
const infectedRouter = Router();
import { registerCity } from '../controllers/cityController';

// /api/infeteds/
// projectRouter.post('/', createProject);
// projectRouter.get('/', getProjects);
infectedRouter.post('/', registerCity);

export default infectedRouter;