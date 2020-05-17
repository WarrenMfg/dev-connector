import validator from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.text = data.text?.trim() || '';

  // validate text
  if ( validator.isEmpty(data.text) || !validator.isLength(data.text, { min: 1, max: 300 }) ) {
    errors.text = 'Text field is must be between 1 and 300 characters';
  } else {
    valid.text = data.text;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};