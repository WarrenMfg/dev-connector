import express from 'express';
import serveStatic from 'serve-static';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { secret } from '../config/config';
// import routes from '../routes/routes';
import apiRouter from '../routes/routes';
import { connect } from '../database/index';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve, join } from 'path';


const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(morgan('dev', {
  skip: req => ['/favicon-32x32.png', '/manifest.webmanifest', '/bundle.js'].includes(req.url)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// verify JWT
app.use((req, res, next) => {
  if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], secret, (err, decode) => {
      if (err) {
        req.user = undefined;
      } else {
        // for loginRequired middleware
        req.user = decode;
      }
      next();
    });

  } else {
    req.user = undefined;
    next();
  }
});

// routes
app.use('/api', apiRouter);

// serve all static files
app.use(express.static(resolve(__dirname, '../../client/public')));

// for react-router-dom URLs on refresh
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../../client/public/index.html'));
});

connect();
app.listen(PORT, () => console.log('Listening on port', PORT));
