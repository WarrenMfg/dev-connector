import { GET_POST, GET_POSTS, ADD_POST, UPDATE_LIKES, DELETE_POST, POST_LOADING } from '../actions/types';

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
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
};