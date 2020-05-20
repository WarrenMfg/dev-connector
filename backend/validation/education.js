import validator from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.school = data.school?.trim() || '';
  data.degree = data.degree?.trim() || '';
  data.fieldOfStudy = data.fieldOfStudy?.trim() || '';
  data.from = data.from?.trim() || '';

  // validate school
  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  } else {
    valid.school = data.school;
  }

  // validate degree
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  } else {
    valid.degree = data.degree;
  }

  // validate fieldOfStudy
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of Study field is required';
  } else {
    valid.fieldOfStudy = data.fieldOfStudy;
  }

  // validate from
  if (validator.isEmpty(data.from)) {
    errors.from = 'From Date field is required';
  } else {
    valid.from = data.from;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};