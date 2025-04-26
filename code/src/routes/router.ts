import express from 'express';
import { Routes } from '../models/routes';
import { createImageRoute } from './createImageRoute';
import { defaultRoute } from './defaultRoute';
import { getImageRoute } from './getImageRoute';
import { getStatusRoute } from './getStatusRoute';

const router = express.Router();

router.get(Routes.HOME, defaultRoute);
router.post(Routes.IMAGE_CREATE, createImageRoute);
router.get(Routes.IMAGE_STATUS, getStatusRoute);
router.get(Routes.IMAGE_GET, getImageRoute);

export default router;
