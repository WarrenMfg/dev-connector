import {
  GET_POST,
  // GET_POST_FOR_LATEST_COMMENTS,
  GET_POSTS,
  GET_MORE_POSTS,
  GET_LATEST_POSTS,
  ADD_POST,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  DELETE_POST,
  POST_LOADING,
  GET_ERRORS, CLEAR_ERRORS
} from '../actions/types';
import { handleErrors, getHeaders } from '../utils/utils';


export const addPost = (postData, clearForm) => dispatch => {
  dispatch(clearErrors());

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


export const addComment = (postID, newComment, clearForm) => dispatch => {
  dispatch(clearErrors());

  fetch(`/api/post/comment/${postID}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newComment)
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedPost => {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: updatedPost
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


export const getLatestPosts = first => dispatch => {
  fetch(`/api/latest-posts/${first}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => {
      if (posts.noPosts) return;
      dispatch({
        type: GET_LATEST_POSTS,
        payload: posts
      })}
    )
    .catch(console.log);
};


export const getMorePosts = last => dispatch => {
  fetch(`/api/more-posts/${last}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => {
      if (posts.noPosts) return;
      dispatch({
        type: GET_MORE_POSTS,
        payload: posts
      })}
    )
    .catch(console.log);
};


export const getPost = id => dispatch => {
  dispatch(setPostLoading());

  fetch(`/api/post/${id}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => dispatch({
      type: GET_POST,
      payload: post
    }))
    .catch(() => dispatch({
      type: GET_POST,
      payload: {}
    }));
};


export const getPostForLatestComments = id => dispatch => {
  // not dispatching setPostLoading here

  fetch(`/api/post/${id}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => dispatch({
      type: GET_POST,
      payload: post
    }))
    .catch(console.log);
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


export const deleteComment = (postID, commentID) => dispatch => {
  fetch(`/api/post/comment/${postID}/${commentID}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedPost => {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: updatedPost
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
};


export const likeOrUnlikePost = id => dispatch => {
  fetch(`/api/post/like/${id}`, {
    method: 'POST',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedPost => {
      dispatch({
        type: UPDATE_LIKES,
        payload: updatedPost
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

const clearErrors = () => ({
  type: CLEAR_ERRORS
});