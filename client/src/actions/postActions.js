import { GET_POST, GET_POSTS, ADD_POST, DELETE_POST, POST_LOADING, GET_ERRORS } from '../actions/types';
import { handleErrors, getHeaders } from '../utils/utils';

export const addPost = postData => dispatch => {
  fetch('/api/post', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(postData)
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => dispatch({
      type: ADD_POST,
      payload: post
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }))
};