import validator from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.status = data.status?.trim() || '';
  data.skills = data.skills || '';

  // validate status
  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  } else {
    valid.status = data.status;
  }

  // validate skills
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  } else {
    valid.skills = data.skills;
  }

  // validate website URL
  // if not undefined or null or ''
  if (!isEmpty(data.website)) {
    // but is invalid URL
    if (!validator.isURL(data.website.trim())) {
      errors.website = 'Not a valid URL';

    // otherwise, valid
    } else {
      valid.website = data.website.trim();
    }
  }

  // validate social urls
  const socialURLs = {
    youtube: data.youtube,
    twitter: data.twitter,
    facebook: data.facebook,
    linkedin: data.linkedin,
    instagram: data.instagram,
  };
  for (let [key, value] of Object.entries(socialURLs)) {
    // if not empty
    if (!isEmpty(value)) {
      // but invalid URL
      if (!validator.isURL(value.trim())) {
        errors[key] = 'Not a valid URL';

      // otherwise, valid
      } else {
        valid[key] = value.trim();
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};