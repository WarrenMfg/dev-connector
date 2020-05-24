import {
  GET_PROFILE,
  GET_PROFILES,
  GET_LATEST_PROFILES,
  GET_MORE_PROFILES,
  PROFILE_LOADING,
  CLEAR_PROFILE_AND_PROFILES
} from '../actions/types';


const initialState = {
  profile: null,
  profiles: null,
  loading: false
};



export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case GET_LATEST_PROFILES:
      return {
        ...state,
        profiles: [...action.payload, ...state.profiles]
      };

    case GET_MORE_PROFILES:
      return {
        ...state,
        profiles: [...state.profiles, ...action.payload]
      };

    case CLEAR_PROFILE_AND_PROFILES:
      return {
        profile: null,
        profiles: null,
        loading: false
      }

    default:
      return state;
  }
};

