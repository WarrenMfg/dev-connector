import {
  validate,
  register,
  login,
  loginRequired,
  logout
} from './api/users';
import {
  currentUserProfile,
  validateProfileInput,
  createOrUpdateUserProfile,
  createOrUpdateExperience,
  getOneBySlug,
  getAllProfiles
} from './api/profile';


const routes = app => {
  // AUTHORIZATION
  // register
  app.route('/register')
    // add condition if already logged in
    .all(validate)
    .post(register);

  // login
  app.route('/login')
    // add condition if already logged in
    .all(validate)
    .post(login);

  // logout
  app.route('/logout')
    .all(loginRequired)
    .put(logout);



  // PROFILE (PRIVATE)
  // login user's profile
  app.route('/profile')
    .all(loginRequired)
    .get(currentUserProfile)
    .post(validateProfileInput, createOrUpdateUserProfile);

  app.route('/experience')
    .all(loginRequired)
    .post(createOrUpdateExperience)

  // PROFILE (PUBLIC)
  // one
  app.route('/profile/:slug')
    .get(getOneBySlug);

  // many
  app.route('/devs')
  .get(getAllProfiles);


};

export default routes;