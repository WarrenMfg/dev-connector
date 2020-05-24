import { SET_CURRENT_USER } from '../actions/types';
import { unescape } from 'validator';
import DOMpurify from 'dompurify';

export const handleErrors = async res => {
  if (!res.ok) {
    throw await res.json();

  } else {
    return res;
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



export const isEmpty = val => (
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0)
);



DOMpurify.setConfig({ALLOWED_TAGS: []});

export const sanitize = input => {
  // if array
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      input[i] = sanitize(input[i]);
    }

  // if object
  } else if (typeof input === 'object') {
    for (let key in input) {
      input[key] = sanitize(input[key]);
    }

  // if boolean for current; or if number for MongoDB __v key
  } else if (typeof input === 'boolean' || typeof input === 'number') {
    return input;

  // otherwise sanitize
  } else {
    const unescaped = unescape(input);
    const purified = DOMpurify.sanitize(unescaped);
    input = unescape(purified);
  }

  return input;
};