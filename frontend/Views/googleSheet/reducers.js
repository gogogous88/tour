import { FETCH_NIGHT_DATA } from "./actions";

export const nightReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NIGHT_DATA:
      return action.payload;

    default:
      return state;
  }
};
