import validator from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.title = data.title?.trim() || '';
  data.company = data.company?.trim() || '';
  data.from = data.from?.trim() || '';

  // validate title
  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else {
    valid.title = data.title;
  }

  // validate company
  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  } else {
    valid.company = data.company;
  }

  // validate from
  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  } else {
    valid.from = data.from;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};