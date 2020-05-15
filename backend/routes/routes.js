import {
  register,
  login
} from './api/users';


const routes = app => {
  // AUTHORIZATION
  // register
  app.route('/register')
    .post(register);

  // login
  app.route('/login')
    .post(login);


};

export default routes;