import express from 'express';
import { Routes } from '../models/routes';
import { createImageRoute } from './createImageRoute';
import { defaultRoute } from './defaultRoute';

const router = express.Router();

router.get(Routes.HOME, defaultRoute);
router.post(Routes.CREATE_IMAGE, createImageRoute);

export default router;
