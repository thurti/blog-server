import express from 'express';
import config from '../config';
import * as SSRController from '../controller/SSRController';

const ssrRoutes = express.Router();

ssrRoutes.get('/', SSRController.getHome);
ssrRoutes.get('/about', SSRController.getAbout);
ssrRoutes.get('/articles', SSRController.getPostList);
ssrRoutes.get('/articles/:slug([\\w-]{1,100})', SSRController.getPostSingle);
ssrRoutes.get('/tag/:tag([\\w-]{1,100})', SSRController.getPostsByTag);
ssrRoutes.use('/static', express.static(config.STATIC, {index: false}));

export default ssrRoutes;