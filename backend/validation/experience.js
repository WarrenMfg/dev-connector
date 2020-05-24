import { escape } from 'validator';
import { isEmpty } from './utils';


export default data => {
  const errors = {};
  const valid = {};

  // ensure properties are present
  data.title = data.title?.trim() || '';
  data.company = data.company?.trim() || '';
  data.location = data.location?.trim() || '';
  data.from = data.from?.trim() || '';
  data.to = data.to?.trim() || '';
  data.description = data.description?.trim() || '';


  // title (required)
  if (isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else {
    valid.title = escape(data.title);
  }

  // company (required)
  if (isEmpty(data.company)) {
    errors.company = 'Company field is required';
  } else {
    valid.company = escape(data.company);
  }

  // location
  if (!isEmpty(data.location)) {
    valid.location = escape(data.location);
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