import { GET_POST, GET_POST_AND_COMPARE_COMMENTS, GET_POSTS, GET_MORE_POSTS, GET_LATEST_POSTS, ADD_POST, UPDATE_LIKES, UPDATE_COMMENTS, DELETE_POST, POST_LOADING } from '../actions/types';

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
        post: action.payload,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      }
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
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload]
      }
    case GET_LATEST_POSTS:
      return {
        ...state,
        // if there are new posts, front load them; else return same state
        posts: action.payload.length ? [...action.payload, ...state.posts] : state.posts
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case GET_POST_AND_COMPARE_COMMENTS:
      return {
        ...state,
        // if true that comment IDs are equal, return state.post; else return action.payload
        post: state.post.comments.every((comment, i) => comment._id === action.payload.comments[i]._id) ? state.post : action.payload
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