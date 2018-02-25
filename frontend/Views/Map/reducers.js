import { FETCH_MAPDATA, FETCH_MAP_ATTR, FETCH_MAP_HOTEL } from "./actions";

export const initState = { delis: [], attrs: [], hotels: [] };

export const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MAPDATA:
      // console.log("delisreducer", action.payload);
      return { delis: action.payload };

    case FETCH_MAP_ATTR:
      return { attrs: action.payload };

    case FETCH_MAP_HOTEL:
      return { hotels: action.payload };

    default:
      return state;
  }
};
