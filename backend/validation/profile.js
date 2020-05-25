import { escape, isURL } from 'validator';
import { isEmpty } from './utils';
import getOptions from '../../client/src/components/dashboard/StatusOptions';


export default data => {
  const errors = {};
  const valid = {};


  // ensure properties are present
  data.status = data.status?.trim() || '';
  data.company = data.company?.trim() || '';
  data.website = data.website?.trim() || '';
  data.location = data.location?.trim() || '';
  data.skills = data.skills.trim() || '';
  data.githubUserName = data.githubUserName.trim() || '';
  data.bio = data.bio.trim() || '';


  // status (required)
  if (isEmpty(data.status)) {
    errors.status = 'Status field is required';
  } else if (!getOptions().find(obj => obj.value === escape(data.status) )) {
    console.log(data.status, escape(data.status))
    errors.status = 'Please select from the dropdown list';
  } else {
    valid.status = escape(data.status);
  }

  // company
  if (!isEmpty(data.company)) {
    valid.company = escape(data.company);
  }

  // website URL
  // if not undefined or null or ''
  if (!isEmpty(data.website)) {
    // but is invalid URL
    if (!isURL(data.website)) {
      errors.website = 'Not a valid URL';

    // otherwise, valid
    } else {
      valid.website = escape(data.website);
    }
  }

  // location
  if (!isEmpty(data.location)) {
    valid.location = escape(data.location);
  }

  // skills (required)
  if (isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  } else {
    valid.skills = escape(data.skills);
  }

  // githubUserName
  if (!isEmpty(data.githubUserName)) {
    valid.githubUserName = escape(data.githubUserName);
  }

  // bio
  if (!isEmpty(data.bio)) {
    valid.bio = escape(data.bio);
  }

  // social urls
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
      if (!isURL(value.trim())) {
        errors[key] = 'Not a valid URL';

      // otherwise, valid
      } else {
        valid[key] = escape(value.trim());
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
    valid
  };
};