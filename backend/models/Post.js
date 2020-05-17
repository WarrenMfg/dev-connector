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
  // consider removing, and using .populate() instead
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
      // how to handle comments.user when user is deleted--default?
      user: {
        type: mongoose.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true
      },
      ///////////////////////
      // consider removing, and using .populate() instead
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