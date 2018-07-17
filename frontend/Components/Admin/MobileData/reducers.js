import { FETCH_ALL_FIREBASE_DATA } from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_FIREBASE_DATA:
      const allFirebaseData = action.payload;
      return { ...state, allFirebaseData };
      break;

    default:
      return state;
      break;
  }
};
