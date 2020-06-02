import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema({
  // same as User.userName
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    immutable: true
  },
  text: {
    type: String,
    required: true
  },
  ///////////////////////
  userName: {
    type: String
  },
  avatar: {
    type: String
  },
  ///////////////////////
  likes: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'User',
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true
      },
      ///////////////////////
      userName: {
        type: String
      },
      avatar: {
        type: String
      },
      ///////////////////////
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
},
{
  timestamps: true
});

const Post = mongoose.model('Post', PostSchema);
export default Post;