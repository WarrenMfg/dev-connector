import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  // same as Profile.slug
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;