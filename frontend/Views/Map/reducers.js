import FETCH_MAPDATA from "./actions";

const initialState = { data: [] };

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAPDATA:
      return Object.assign({}, state, { data: action.payload });

    default:
      return state;
  }
};
