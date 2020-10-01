import express from 'express';
import * as PostController from '../controller/PostController';

const apiRoutes = express.Router();

apiRoutes.get('/', PostController.getPosts);
apiRoutes.get('/:slug([\\w-]{1,100})', PostController.getSinglePost);
apiRoutes.get('/tag/:tag([\\w-]{1,100})', PostController.getPostsByTag);

export default apiRoutes;