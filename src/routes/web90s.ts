import express from 'express';
import * as Web90sController from '../controller/Web90sController';

const webRoutes = express.Router();

webRoutes.get('/', Web90sController.getPosts);
webRoutes.get('/:slug([\\w-]{1,100})', Web90sController.getSinglePost);
webRoutes.get('/tag/:tag([\\w-]{1,100})', Web90sController.getPostsByTag);

export default webRoutes;