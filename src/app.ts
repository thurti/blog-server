import express from 'express';
import config from './config';
import apiRoutes from './routes/api';
import ssrRoutes from './routes/ssr';
import web90sRoutes from './routes/web90s';

const app = express();

//helmet middleware sets some security headers
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: false,
}));

//set cors header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//add routes
app.use('/static', express.static(config.STATIC));
app.use('/api/posts', apiRoutes);
app.use('/90s', web90sRoutes);
app.get('/:slug', ssrRoutes);

//listen on port
app.listen(config.PORT);

export default app;