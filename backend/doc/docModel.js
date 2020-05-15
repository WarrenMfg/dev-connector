import mongoose from 'mongoose';


const docSchema = new mongoose.Schema({
  // example
  item: {
    type: String,
    required: true
  }
});

const Doc = mongoose.model('Doc', docSchema);
export default Doc;
