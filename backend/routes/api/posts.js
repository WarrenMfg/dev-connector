import Post from '../../models/Post';
import postValidation from '../../validation/post';


export const validatePostInput = (req, res, next) => {
  const { errors, isValid, valid } = postValidation(req.body);

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    Object.assign(req.body, valid);
    next();
  }
};


export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      user: req.user._id,
      text: req.body.text,
      // from redux
      userName: req.body.userName,
      avatar: req.body.avatar
    });

    if (!newPost) {
      return res.status(404).json({ noPost: true, message: 'Post could not be created.' });
    }

    res.send(newPost);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }


};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    if (!posts) {
      return res.status(404).json({ noPost: true, message: 'Posts could not be found.' });
    }

    res.send(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id).lean().exec();

    if (!post) {
      return res.status(404).json({ noPost: true, message: 'Post could not be found.' });
    }

    res.send(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);

    if (!post) {
      return res.status(404).json({ noPost: true, message: 'Post could not be found.' });
    }

    // if user is not post creator
    if (post.user.toString() !== req.user._id) {
      return res.status(405).json({ message: 'Post could not be deleted.' });
    }

    // otherwise, remove
    post.remove()
      .then(removedPost => res.send(removedPost))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const getPosts = async (req, res) => {
//   try {

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };