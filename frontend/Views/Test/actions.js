import axios from "axios";
export const POST_HOTEL_RSVP = "POST_HOTEL_RSVP";

export const postHotelRsvp = value => async dispatch => {
  const hotelRsvp = await axios.post("/api/hotel/rsvp", value);
  dispatch({ type: POST_HOTEL_RSVP, payload: hotelRsvp });
};
