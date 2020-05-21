import { GET_POST, GET_POSTS, ADD_POST, DELETE_POST, POST_LOADING, GET_ERRORS } from '../actions/types';
import { handleErrors, getHeaders } from '../utils/utils';

export const addPost = (postData, clearForm) => dispatch => {
  fetch('/api/post', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(postData)
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => {
      dispatch({
        type: ADD_POST,
        payload: post
      });
      clearForm();
  })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};


export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  fetch('/api/posts', {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => dispatch({
      type: GET_POSTS,
      payload: posts
    }))
    .catch(() => dispatch({
      type: GET_POSTS,
      payload: []
    }));
};


export const deletePost = id => dispatch => {
  fetch(`/api/post/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};


const setPostLoading = () => ({
  type: POST_LOADING
});