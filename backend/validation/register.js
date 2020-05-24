import { isEmail, isLength, escape } from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.userName = data.userName?.trim() || '';
  data.email = data.email?.trim() || '';
  data.password = data.password?.trim() || '';


  // userName
  if (!isLength(data.userName, { min: 1, max: 30 })) {
    errors.userName = 'Username must be between 1 and 30 characters';
  } else if (!/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(data.userName)) {
    errors.userName = 'Username must contain letters, numbers, and dashes only';
  } else {
    valid.userName = escape(data.userName);
  }

  // email
  if (!isEmail(data.email)) {
    errors.email = 'Email must be in the form of example@domain.com'
  } else {
    valid.email = escape(data.email);
  }

  // password
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  } else if (!/^([a-zA-Z0-9!@#$%^*()-=~_+,.?]{6,30})$/.test(data.password)) {
    errors.password = 'Password must contain a-zA-Z0-9!@#$%^*()-=~_+,.? only';
  } else {
    valid.password = escape(data.password);
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};