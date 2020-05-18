import { TEST_DISPATCH } from './types';

// REGISTER
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  }
};