import express from 'express';
import morgan from 'morgan';
import { connect } from '../database/index';
import users from '../routes/api/users.js';
import profile from '../routes/api/profile.js';
import posts from '../routes/api/posts.js';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve } from 'path';


const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


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
