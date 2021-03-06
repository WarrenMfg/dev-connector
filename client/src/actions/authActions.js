import { handleErrors, getHeaders, setCurrentUser, logoutExpiredUser } from '../utils/utils';
import { GET_ERRORS, CLEAR_ERRORS, CLEAR_PROFILE_AND_PROFILES, CLEAR_POST_AND_POSTS } from './types';
import jwtDecode from 'jwt-decode';


// REGISTER
export const registerUser = (newUser, history) => dispatch => {
  fetch('/api/register', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newUser)
  })
    .then(handleErrors)
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      })
      history.push('/login');
    })
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

      const decoded = jwtDecode(data.token.split(' ')[1]);
      // set current user
      dispatch(setCurrentUser(decoded));
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};

// LOGOUT
export const logoutUser = history => dispatch => {
  fetch('/api/logout', {
    method: 'PUT',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(() => {

      // remove local storage
      localStorage.removeItem('token');
      // clear state
      dispatch(setCurrentUser({}));
      dispatch({ type: CLEAR_PROFILE_AND_PROFILES });
      dispatch({ type: CLEAR_POST_AND_POSTS });
      // redirect
      history.push('/');
    })
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    });
};