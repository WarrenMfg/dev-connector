import { handleErrors, getHeaders, setCurrentUser, sanitize } from '../utils/utils';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_LATEST_PROFILES,
  GET_MORE_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_PROFILE_AND_PROFILES,
  CLEAR_POST_AND_POSTS
} from './types';


export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  fetch('/api/profiles', {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(profiles => {
      if (profiles.noProfiles) return;
      dispatch({
        type: GET_PROFILES,
        payload: profiles.map(profile => sanitize(profile))
      });
    })
    .catch(() => dispatch({
      type: GET_PROFILES,
      payload: []
    })
  );
};


export const getLatestProfiles = latest => dispatch => {
  fetch(`/api/latest-profiles/${latest}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(profiles => {
      if (profiles.noProfiles) return;
      dispatch({
      type: GET_LATEST_PROFILES,
      payload: profiles.map(profile => sanitize(profile))
    });
  })
    .catch(console.log);
};


export const getMoreProfiles = (last, toggle) => dispatch => {
  fetch(`/api/more-profiles/${last}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(profiles => {
      if (profiles.noProfiles) {
        toggle.canFetch = true;
        return;
      }

      dispatch({
        type: GET_MORE_PROFILES,
        payload: profiles.map(profile => sanitize(profile))
      });

      toggle.canFetch = true;
    })
    .catch(console.log);
};


export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  fetch('/api/profile', {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(profile => {
      if (profile.noProfile) throw {};
      dispatch({
        type: GET_PROFILE,
        payload: sanitize(profile)
      });
    })
    .catch(none => dispatch({
      type: GET_PROFILE,
      payload: none
    })
  );
};


export const getProfileBySlug = slug => dispatch => {
  dispatch(setProfileLoading());

  fetch(`/api/profile/${slug}`, {
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(profile => dispatch({
      type: GET_PROFILE,
      payload: sanitize(profile)
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: err
    }));
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


export const deleteExperience = id => dispatch => {
  fetch(`/api/experience/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedProfile => dispatch({
      type: GET_PROFILE,
      payload: sanitize(updatedProfile)
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};


export const deleteEducation = id => dispatch => {
  fetch(`/api/education/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(updatedProfile => dispatch({
      type: GET_PROFILE,
      payload: sanitize(updatedProfile)
    }))
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
        // remove local storage
        localStorage.removeItem('token');
        // clear state
        dispatch(setCurrentUser({}));
        dispatch(clearProfileAndProfiles());
        dispatch({ type: CLEAR_POST_AND_POSTS });
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





const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearProfileAndProfiles = () => ({
  type: CLEAR_PROFILE_AND_PROFILES
});