import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// global state keys
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});

