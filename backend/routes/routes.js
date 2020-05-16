import {
  validate,
  register,
  login,
  loginRequired,
  logout
} from './api/users';


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


};

export default routes;