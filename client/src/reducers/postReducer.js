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
  CLEAR_POST_AND_POSTS
} from '../actions/types';
import { isEmpty } from '../utils/utils';


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

    case UPDATE_COMMENTS:
      return {
        ...state,
        post: Object.assign(state.post, action.payload)
      };

    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_POST:
      return {
        ...state,
        post: isEmpty(action.payload) ? state.post : Object.assign(state.post, action.payload),
        loading: false
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_LATEST_POSTS:
      return {
        ...state,
        posts: [...action.payload, ...state.posts]
      };

    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload]
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    case CLEAR_POST_AND_POSTS:
      return {
        ...state,
        post: {},
        posts: [],
        loading: false
      };

    default:
      return state;
  }
};