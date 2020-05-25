import { SET_CURRENT_USER } from '../actions/types';
import { isEmpty } from '../utils/utils';


const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload), // receives the decoded jwt or an empty object
        user: action.payload
      };
    default:
      return state;
  }
};