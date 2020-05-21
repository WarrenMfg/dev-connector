import { GET_POST, GET_POSTS, ADD_POST, DELETE_POST, POST_LOADING } from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
};