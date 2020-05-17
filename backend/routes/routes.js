import {
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


const routes = app => {
  // AUTHORIZATION
  // register
  app.route('/register')
    // add condition in register for if already logged in
    .all(validate)
    .post(register);

  // login
  app.route('/login')
    // add condition in login for if already logged in
    .all(validate)
    .post(login);

  // logout
  app.route('/logout')
    .all(loginRequired)
    .put(logout);



  // PROFILE (PROTECTED)
  // login user's profile
  app.route('/profile')
    .all(loginRequired)
    .get(currentUserProfile)
    .post(validateProfileInput, createOrUpdateUserProfile)
    .delete(deleteProfile, deleteUser);

  app.route('/experience')
    .all(loginRequired)
    .post(validateExperienceInput, createExperience);

  app.route('/experience/:_id')
    .all(loginRequired)
    .delete(deleteExperience);

  app.route('/education')
    .all(loginRequired)
    .post(validateEducationInput, createEducation);

  app.route('/education/:_id')
    .all(loginRequired)
    .delete(deleteEducation);

  // PROFILE (PUBLIC)
  // one
  app.route('/profile/:slug')
    .get(getOneBySlug);

  // many
  app.route('/devs')
    .get(getAllProfiles);


};

export default routes;