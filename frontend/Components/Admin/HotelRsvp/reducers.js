import { GET_ALL_HOTEL_RSVP } from "./types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOTEL_RSVP:
      const hotelRsvp = action.payload;
      return { ...state, hotelRsvp };

    default:
      return state;
  }
};
