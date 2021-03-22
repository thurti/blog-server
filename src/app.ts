import express, { Request, Response } from 'express';
import helmet from 'helmet';
import config from './config';
import apiRoutes from './routes/api';
import ssrRoutes from './routes/ssr';
import browser from 'browser-detect';

const app = express();

//helmet middleware sets some security headers
app.use(helmet({
  contentSecurityPolicy: false,
}));

//set cors header
app.use(function(req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", config.ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//detect browser
app.use(function(req: Request, res: Response, next) {
  res.locals.browser = browser(req.headers['user-agent']);
  next();
});

//add routes
app.use('/api/posts', apiRoutes);
app.use('/', ssrRoutes);

//listen on port
app.listen(config.PORT, config.HOST);

export default app;