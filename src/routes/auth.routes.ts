import { login, signup } from '../controllers/auth.controller';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', signup);

authRouter.post('/login', login);

export default authRouter;
