import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { secret } from '../config/config';
import routes from '../routes/routes';
import { connect } from '../database/index';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve } from 'path';


const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(morgan('dev'));
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
routes(app);


/*
uncomment before app deploys
app.get('/bundle.js', (req, res) => {
  const gzip = createGzip();
  const bundle = createReadStream(resolve(__dirname, '../../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=86400' });
  bundle.pipe(gzip).pipe(res);
});
*/

app.use('/', express.static('client/public'));

connect();
app.listen(PORT, () => console.log('Listening on port', PORT));
