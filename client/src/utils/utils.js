import { SET_CURRENT_USER } from '../actions/types';

export const handleErrors = async response => {
  if (!response.ok) {
    throw await response.json();

  } else {
    return response;
  }
};



export const getHeaders = () => {
  const headers = {
      'Content-Type': 'application/json'
    };

  const token = localStorage.getItem('token');

  if (token) {
    headers['Authorization'] = token;
  }

  return headers;
};



export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};



export const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0);