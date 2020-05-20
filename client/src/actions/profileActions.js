import { handleErrors, getHeaders } from '../utils/utils';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  fetch('/api/profile', {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => dispatch({
      type: GET_PROFILE,
      payload: data
    }))
    .catch(() => dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  );
};

export const setProfileLoading = () => ({
    type: PROFILE_LOADING
  });

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});