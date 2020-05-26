import {
  GET_POST,
  GET_POSTS,
  GET_MORE_POSTS,
  GET_LATEST_POSTS,
  ADD_POST,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  DELETE_POST,
  POST_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';
import { handleErrors, getHeaders, sanitize, logoutExpiredUser } from '../utils/utils';




export const addPost = (postData, clearForm, history, getLatestPostsSetInterval) => dispatch => {
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
        payload: sanitize(post)
      });
      clearForm();
      getLatestPostsSetInterval();
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
        getLatestPostsSetInterval();
      }
    });
};


export const getPosts = history => dispatch => {
  dispatch(setPostLoading());

  fetch('/api/posts', {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => {
      if (posts.noPosts) return;
      dispatch({
        type: GET_POSTS,
        payload: posts.map(post => sanitize(post))
      });
    })
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        dispatch({
          type: GET_POSTS,
          payload: []
        });
      }
    });
};


export const getLatestPosts = (first, history) => dispatch => {
  fetch(`/api/latest-posts/${first}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => {
      if (posts.noPosts) return;
      dispatch({
        type: GET_LATEST_POSTS,
        payload: posts.map(post => sanitize(post))
      })}
    )
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        console.log(err);
      }
    });
};


export const getMorePosts = (last, toggle, history) => dispatch => {
  fetch(`/api/more-posts/${last}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(posts => {
      if (posts.noPosts) {
        toggle.canFetch = true;
        return;
      };

      dispatch({
        type: GET_MORE_POSTS,
        payload: posts.map(post => sanitize(post))
      });

      toggle.canFetch = true;
    })
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        console.log(err);
      }
    });
};


export const getPost = (id, history) => dispatch => {
  dispatch(setPostLoading());

  fetch(`/api/post/${id}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => dispatch({
      type: GET_POST,
      payload: sanitize(post)
    }))
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        dispatch({
          type: GET_POST,
          payload: {}
        });
      }
    });
};


export const getPostForLatestComments = (id, history) => dispatch => {
  // not dispatching setPostLoading here

  fetch(`/api/post/${id}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(post => dispatch({
      type: GET_POST,
      payload: sanitize(post)
    }))
    .catch(err => {
      if (err.expiredUser) {
        logoutExpiredUser(dispatch);
        history.push('/');
      } else {
        console.log(err);
      }
    });
};


export const addComment = (postID, newComment, clearForm, history) => dispatch => {
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
        payload: sanitize(updatedPost)
      });
      clearForm();
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


export const deletePost = (id, history) => dispatch => {
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


export const deleteComment = (postID, commentID, history) => dispatch => {
  fetch(`/api/post/comment/${postID}/${commentID}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedPost => {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: sanitize(updatedPost)
      });
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


export const likeOrUnlikePost = (id, history) => dispatch => {
  fetch(`/api/post/like/${id}`, {
    method: 'POST',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedPost => {
      dispatch({
        type: UPDATE_LIKES,
        payload: sanitize(updatedPost)
      });
    })
    .catch(err => {
      if (err.expiredUser) {
        console.log(err);
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


const setPostLoading = () => ({
  type: POST_LOADING
});

const clearErrors = () => ({
  type: CLEAR_ERRORS
});