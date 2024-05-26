import { createProfile } from '../controllers/profile.controller';
import express from 'express';

const profileRouter = express.Router();

profileRouter.post('/createProfile', createProfile);

export default profileRouter;
