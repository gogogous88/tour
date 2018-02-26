import axios from "axios";
export const POST_HOTEL_RSVP = "POST_HOTEL_RSVP";
export const SHOW_CONFIRM = "SHOW_CONFIRM";

export const postHotelRsvp = (value, callback) => async dispatch => {
  const hotelRsvp = await axios.post("/api/hotel/rsvp", value).then(() => {
    callback();
  });
  dispatch({ type: POST_HOTEL_RSVP, payload: hotelRsvp });
};

export const comfrimPostHotelRsvp = (value, callback) => async dispatch => {
  const hotelRsvp = await axios.post("/api/hotel/rsvp", value).then(() => {
    callback();
  });

  dispatch({ type: POST_HOTEL_RSVP, payload: hotelRsvp });
};

export const changeShowComfirm = () => async dispatch => {
  dispatch({ type: SHOW_CONFIRM, payload: true });
};
