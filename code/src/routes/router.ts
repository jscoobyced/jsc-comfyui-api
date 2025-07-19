import express from 'express';
import { Routes } from '../models/routes';
import { createAssetRoute } from './createAssetRoute';
import { defaultRoute } from './defaultRoute';
import { getImageRoute } from './getImageRoute';
import { getStatusRoute } from './getStatusRoute';
import { getVideoRoute } from './getVideoRoute';

const router = express.Router();

router.get(Routes.HOME, defaultRoute);
router.post(Routes.IMAGE_CREATE, createAssetRoute);
router.get(Routes.IMAGE_STATUS, getStatusRoute);
router.get(Routes.IMAGE_GET, getImageRoute);
router.get(Routes.VIDEO_GET, getVideoRoute);

export default router;
