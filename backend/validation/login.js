import { isEmail, isLength, escape } from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.email = data.email?.trim() || '';
  data.password = data.password?.trim() || '';


  // email
  if (!isEmail(data.email)) {
    errors.email = 'Email must be in the form of example@domain.com';
  } else if (/^\$/.test(data.email)) {
    errors.email = 'Email must not contain special characters';
  } else {
    valid.email = escape(data.email);
  }

  // password
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  } else if (!/^([a-zA-Z0-9!@#%^*()-=~_+,.?]{6,30})$/.test(data.password)) {
    errors.password = 'Password must contain a-zA-Z0-9!@#%^*()-=~_+,.? only';
  } else {
    valid.password = escape(data.password);
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};