import express from 'express';
import * as SSRController from '../controller/SSRController';

const ssrRoutes = express.Router();

ssrRoutes.get('/:slug([\\w-]{1,100})', SSRController.getSinglePost);
ssrRoutes.get('/tag/:tag([\\w-]{1,100})', SSRController.getPostsByTag);

export default ssrRoutes;