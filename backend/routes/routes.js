import { Router } from 'express';
import {
  hasVerifiedToken,
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
  getAllProfiles
} from './api/profile';
import {
  validatePostInput,
  createPost,
  deletePost,
  getPost,
  getPosts
} from './api/posts'


const apiRouter = Router();



  // AUTHORIZATION
  // register
  apiRouter.route('/register')
    .all(hasVerifiedToken, validate)
    // add get route
    .post(register);

  // login
  apiRouter.route('/login')
    .all(hasVerifiedToken, validate)
    // add get route
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

  // many
  apiRouter.route('/devs')
    .get(getAllProfiles);



  // POSTS
  // one (PRIVATE)
  apiRouter.route('/post')
    .all(loginRequired)
    .post(validatePostInput, createPost)

  // one (PRIVATE)
  apiRouter.route('/post/:_id')
    .all(loginRequired)
    .delete(deletePost)

  // one (PUBLIC)
  apiRouter.route('/post/:_id')
    .get(getPost)

  // many (PUBLIC)
  apiRouter.route('/posts')
    .get(getPosts)



export default apiRouter;