import { handleErrors, getHeaders, setCurrentUser } from '../utils/utils';
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


export const createOrUpdateProfile = (profileData, history) => dispatch => {
  fetch('/api/profile', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(profileData)
  })
    .then(handleErrors)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};


export const createExperience = (experienceData, history) => dispatch => {
  fetch('/api/experience', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(experienceData)
  })
    .then(handleErrors)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};


export const createEducation = (educationData, history) => dispatch => {
  fetch('/api/education', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(educationData)
  })
    .then(handleErrors)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};


export const deleteAccount = history => dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    fetch('/api/profile', {
      method: 'DELETE',
      headers: getHeaders(),
    })
      .then(handleErrors)
      .then(() => {
        // set current user to no user
        dispatch(clearCurrentProfile())
        // clear current profile
        dispatch(setCurrentUser({}));
        // remove local storage
        localStorage.removeItem('token');
        // redirect
        history.push('/');
      })
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
  }
};





export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});