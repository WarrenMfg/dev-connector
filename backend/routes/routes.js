import {
  validate,
  register,
  login,
  loginRequired,
  logout
} from './api/users';
import {
  currentUsersProfile
} from './api/profile';


const routes = app => {
  // AUTHORIZATION
  // register
  app.route('/register')
    .all(validate)
    .post(register);

  // login
  app.route('/login')
    .all(validate)
    .post(login);

  // logout
  app.route('/logout')
    .all(loginRequired)
    .put(logout);



  // PROFILE
  // login user's profile
  app.route('/profile')
    .all(loginRequired)
    .get(currentUsersProfile)

};

export default routes;