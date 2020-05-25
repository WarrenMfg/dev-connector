export const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0);


export const sanitize = obj => {
  for (let [key, val] of Object.entries(obj)) {
    if (/^\$/.test(val)) {
      delete obj[key];
    }
  }
};