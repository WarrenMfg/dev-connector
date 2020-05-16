import validator from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.userName = data.userName?.trim() || '';
  data.email = data.email?.trim() || '';
  data.password = data.password?.trim() || '';

  // validate userName
  if (!validator.isLength(data.userName, { min: 1, max: 30 })) {
    errors.userName = 'Username must be between 1 and 30 characters';
  } else {
    valid.userName = data.userName;
  }

  // validate email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email must be in the form of example@domain.com'
  } else {
    valid.email = data.email;
  }

  // validate password
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  } else {
    valid.password = data.password;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};