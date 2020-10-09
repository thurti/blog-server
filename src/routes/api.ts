import express from 'express';
import * as ApiController from '../controller/ApiController';

const apiRoutes = express.Router();

apiRoutes.get('/', ApiController.getPosts);
apiRoutes.get('/:slug([\\w-]{1,100})', ApiController.getSinglePost);
apiRoutes.get('/tag/:tag([\\w-]{1,100})', ApiController.getPostsByTag);

export default apiRoutes;