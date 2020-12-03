import express from 'express';
import config from '../config';
import * as SSRController from '../controller/SSRController';

const ssrRoutes = express.Router();

ssrRoutes.get('/', SSRController.getIndex);
ssrRoutes.get('/about', SSRController.getAbout);
ssrRoutes.get('/:slug([\\w-]{1,100})', SSRController.getSinglePost);
ssrRoutes.get('/tag/:tag([\\w-]{1,100})', SSRController.getPostsByTag);
ssrRoutes.use('/static', express.static(config.STATIC, {index: false}));

export default ssrRoutes;