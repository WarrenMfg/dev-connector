import { Router } from 'express';
import {
  // hasVerifiedToken,
  validate,
  register,
  login,
  loginRequired,
  logout,
  deleteUser
} from './api/users';
import {
  currentUserProfile,
  validateProfileInput,
  createOrUpdateUserProfile,
  deleteProfile,
  validateExperienceInput,
  createExperience,
  deleteExperience,
  validateEducationInput,
  createEducation,
  deleteEducation,
  getOneBySlug,
  getGitHubRepos,
  getAllProfiles
} from './api/profile';
import {
  validatePostInput,
  createPost,
  likeOrUnlikePost,
  validateCommentInput,
  addComment,
  deleteComment,
  deletePost,
  getPost,
  getLatestPosts,
  getMorePosts,
  getPosts
} from './api/posts'


const apiRouter = Router();



  // AUTHORIZATION
  // register
  apiRouter.route('/register')
    .all(validate)
    .post(register);

  // login
  apiRouter.route('/login')
    .all(validate)
    .post(login);

  // logout
  apiRouter.route('/logout')
    .all(loginRequired)
    .put(logout);



  // PROFILE (PRIVATE)
  apiRouter.route('/profile')
    .all(loginRequired)
    .get(currentUserProfile)
    .post(validateProfileInput, createOrUpdateUserProfile)
    .delete(deleteProfile, deleteUser);

  apiRouter.route('/experience')
    .all(loginRequired)
    .post(validateExperienceInput, createExperience);

  apiRouter.route('/experience/:_id')
    .all(loginRequired)
    // add put
    .delete(deleteExperience);

  apiRouter.route('/education')
    .all(loginRequired)
    .post(validateEducationInput, createEducation);

  apiRouter.route('/education/:_id')
    .all(loginRequired)
    // add put
    .delete(deleteEducation);

  // PROFILE (PUBLIC)
  // one
  apiRouter.route('/profile/:slug')
    .get(getOneBySlug);

  apiRouter.route('/githubRepos/:githubUserName')
    .get(getGitHubRepos);

  // many
  apiRouter.route('/profiles')
    .get(getAllProfiles);



  // POSTS
  // one (PRIVATE)
  apiRouter.route('/post')
    .all(loginRequired)
    .post(validatePostInput, createPost);

  apiRouter.route('/post/like/:_id')
    .all(loginRequired)
    .post(likeOrUnlikePost);

  apiRouter.route('/post/:_id')
    .all(loginRequired)
    .get(getPost)
    .delete(deletePost);

  apiRouter.route('/post/comment/:_id')
    .all(loginRequired)
    .post(validateCommentInput, addComment);

  apiRouter.route('/post/comment/:post_id/:comment_id')
    .all(loginRequired)
    .delete(deleteComment);

  // many (PRIVATE)
  apiRouter.route('/posts')
    .all(loginRequired)
    .get(getPosts);

  apiRouter.route('/latest-posts/:latest')
    .all(loginRequired)
    .get(getLatestPosts);

  apiRouter.route('/more-posts/:last')
    .all(loginRequired)
    .get(getMorePosts);



export default apiRouter;