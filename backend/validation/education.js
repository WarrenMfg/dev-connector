import { escape } from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.school = data.school?.trim() || '';
  data.degree = data.degree?.trim() || '';
  data.fieldOfStudy = data.fieldOfStudy?.trim() || '';
  data.from = data.from?.trim() || '';
  data.to = data.to?.trim() || '';
  data.description = data.description?.trim() || '';


  // school
  if (isEmpty(data.school)) {
    errors.school = 'School field is required';
  } else {
    valid.school = escape(data.school);
  }

  // degree
  if (isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  } else {
    valid.degree = escape(data.degree);
  }

  // fieldOfStudy
  if (isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of Study field is required';
  } else {
    valid.fieldOfStudy = escape(data.fieldOfStudy);
  }

  // from
  if (isEmpty(data.from)) {
    errors.from = 'From Date field is required';
  } else {
    valid.from = escape(data.from);
  }

  // to
  if (!isEmpty(data.to)) {
    valid.to = escape(data.to);
  }

  // description
  if (!isEmpty(data.description)) {
    valid.description = escape(data.description);
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};