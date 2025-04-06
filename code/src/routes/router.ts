import express from 'express';
import { defaultRoute } from './defaultRoute';

const router = express.Router();

router.get('/', defaultRoute);

export default router;
