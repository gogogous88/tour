import { FETCH_MAPDATA, FETCH_MAP_ATTR } from "./actions";

export const initState = { delis: [], attrs: [] };

export const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MAPDATA:
      return { delis: action.payload };

    case FETCH_MAP_ATTR:
      return { attrs: action.payload };

    default:
      return state;
  }
};
