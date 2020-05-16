import {
  register,
  login,
  loginRequired,
  logout
} from './api/users';


const routes = app => {
  // AUTHORIZATION
  // register
  app.route('/register')
    .post(register);

  // login
  app.route('/login')
    .post(login);

  // logout
  app.route('/logout')
    .all(loginRequired)
    .put(logout);


};

export default routes;