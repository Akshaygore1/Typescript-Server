import 'dotenv/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes';
import { PORT } from '../config';
import profileRouter from './routes/profile.routes';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.listen(PORT || 3001, () => {
	console.log(`Server running on localhost:${process.env.PORT}`);
});
