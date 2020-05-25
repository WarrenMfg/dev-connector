import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { secret } from '../config/config';
import apiRouter from '../routes/routes';
import seedRouter from '../routes/seedRoutes';
import { connect } from '../database/index';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve } from 'path';


const PORT = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by');

// middleware
app.use(morgan('dev', {
  skip: req => ['/favicon-32x32.png', '/manifest.webmanifest', '/bundle.js'].includes(req.url)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// verify JWT
app.use((req, res, next) => {
  try {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          req.expiredUser = jwtDecode(token);
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
  } catch (e) {
    res.sendStatus(400);
  }
});

// routes
app.use('/api', apiRouter);
app.use('/seed', seedRouter);

app.get('/bundle.js', (req, res) => {
  const gzip = createGzip();
  const bundle = createReadStream(resolve(__dirname, '../../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip', 'Cache-Control': 'public, max-age=86400' });
  bundle.pipe(gzip).pipe(res);
});

// serve all static files
app.use(express.static(resolve(__dirname, '../../client/public')));

// for react-router-dom URLs on refresh
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../../client/public/index.html'));
});

connect();
app.listen(PORT, () => console.log('Listening on port', PORT));
