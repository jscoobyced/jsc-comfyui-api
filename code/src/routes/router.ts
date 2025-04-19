import express from 'express';
import { Routes } from '../models/routes';
import { createImageRoute } from './createImageRoute';
import { defaultRoute } from './defaultRoute';
import { retreiveImageRoute } from './retreiveImageRoute';

const router = express.Router();

router.get(Routes.HOME, defaultRoute);
router.post(Routes.CREATE_IMAGE, createImageRoute);
router.get(Routes.RETREIVE_IMAGE, retreiveImageRoute);

export default router;
