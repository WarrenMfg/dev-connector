import mongoose from 'mongoose';
import { URI } from '../config/config';


export const connect = (location = URI) => {
  mongoose.connect(location, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Connected to devConnector!'))
    .catch(err => console.log('connection error:', err));
};