import { handleErrors, getHeaders, setCurrentUser } from '../utils/utils';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwtDecode from 'jwt-decode';

// REGISTER
export const registerUser = (newUser, history) => dispatch => {
  fetch('/api/register', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newUser)
  })
    .then(handleErrors)
    .then(() => history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// LOGIN
export const loginUser = userData => dispatch => {
  fetch('/api/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData)
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      // save to local storage
      localStorage.setItem('token', data.token);
      // decode token to get userName and email
      const decoded = jwtDecode(data.token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};

// LOGOUT
export const logoutUser = () => dispatch => {
  fetch('/api/logout', {
    method: 'PUT',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(() => {
      // remove local storage
      localStorage.removeItem('token');
      // set current user to no user
      dispatch(setCurrentUser({}));
      // reroute to '/'
      window.location.href = '/';

    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};