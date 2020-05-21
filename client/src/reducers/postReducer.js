import { GET_POST, GET_POSTS, ADD_POST, DELETE_POST, POST_LOADING } from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};