import Post from '../../models/Post';
import postValidation from '../../validation/post';
import commentValidation from '../../validation/comment';
import { isEmpty, sanitize } from '../../validation/utils';


const global$limit = 10;


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
    const posts = await Post.aggregate([ { $sort: { createdAt: -1 } }, { $limit: global$limit } ]);

    if (!posts) {
      return res.json({ noPosts: true, message: 'Posts could not be found.' });
    }

    res.send(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getLatestPosts = async (req, res) => {
  try {
    const { latest } = req.params;
    const agg = [
      { $match: { createdAt: { $gt: new Date(latest) } } },
      { $sort: { createdAt: -1 } }
    ];

    const posts = await Post.aggregate(agg);
    if (isEmpty(posts)) {
      return res.json({ noPosts: true, message: 'No new posts.' });
    }

    res.send(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMorePosts = async (req, res) => {
  try {
    const { last } = req.params;
    const agg = [
      { $match: { createdAt: { $lt: new Date(last) } } },
      { $sort: { createdAt: -1 } },
      { $limit: global$limit }
    ];

    const posts = await Post.aggregate(agg);

    if (isEmpty(posts)) {
      return res.json({ noPosts: true, message: 'No more posts.' });
    }

    res.send(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPost = async (req, res) => {
  try {
    sanitize(req.params);

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
    sanitize(req.params);

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


export const likeOrUnlikePost = async (req, res) => {
  try {
    sanitize(req.params);

    const post = await Post.findById(req.params._id);

    if (!post) {
      return res.status(404).json({ noPost: true, message: 'Post could not be updated.' });
    }

    // find index of user's like
    let index = post.likes.findIndex(like => like.user.toString() === req.user._id);

    // if user hasn't liked post yet
    if (index === -1) {
      // add it
      post.likes.push({ user: req.user._id });

    // otherwise, remove user's like from post
    } else {
      post.likes.splice(index, 1);
    }

    // save to db
    post.save()
      .then(updatedPost => res.send(updatedPost))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const validateCommentInput = (req, res, next) => {
  const { errors, isValid, valid } = commentValidation(req.body);

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    Object.assign(req.body, valid);
    next();
  }
};


export const addComment = async (req, res) => {
  try {
    sanitize(req.params);

    const post = await Post.findById(req.params._id);

    if (!post) {
      return res.status(404).json({ noPost: true, message: 'Comment could not be added.' });
    }

    const newComment = {
      user: req.user._id,
      text: req.body.text,
      userName: req.body.userName,
      avatar: req.body.avatar
    };

    post.comments.unshift(newComment);

    post.save()
      .then(updatedPost => res.send(updatedPost))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteComment = async (req, res) => {
  try {
    sanitize(req.params);

    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ noPost: true, message: 'Comment could not be deleted.' });
    }

    const index = post.comments.findIndex(comment => comment._id.toString() === req.params.comment_id);
    // if comment does not exist
    if (index === -1) {
      return res.status(404).json({ message: 'Comment does not exist.' });

    // if user is not comment creator
    } else if (post.comments[index].user.toString() !== req.user._id) {
      return res.status(405).json({ message: 'Comment could not be deleted.' });
    }

    // remove and save to db
    post.comments.splice(index, 1);
    post.save()
      .then(updatedPost => res.send(updatedPost))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};