import express from 'express';
import * as PostController from '../controller/PostController';

const webRoutes = express.Router();

webRoutes.get('/', PostController.getPostsHtml);
webRoutes.get('/:slug([\\w-]{1,100})', PostController.getSinglePostHtml);
webRoutes.get('/tag/:tag([\\w-]{1,100})', PostController.getPostsByTagHtml);

export default webRoutes;