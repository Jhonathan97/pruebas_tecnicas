import express, {json} from 'express';
import morgan from 'morgan';
const app = express();

//importing Routes
import infectedRoutes from './routes/infectedRouter';
import cityRoutes from './routes/cityRouter';
// middlewares
app.use(morgan('dev'));
app.use(json());

// routes 
app.use('/api/infecteds', infectedRoutes);
app.use('/api/cities', cityRoutes);
export default app;