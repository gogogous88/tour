import axios from "axios";
export const GET_CITY = "GET_CITY";

export const postGetCity = value => async dispatch => {
  const data = await axios.post("/api/user/location", value);

  const addr = { city: data.data.city, state: data.data.state };
  console.log(addr);
  dispatch({ type: GET_CITY, payload: addr });
};

// export const postHotelRsvp = value => async dispatch => {
//   const hotelRsvp = await axios.post("/api/hotel/rsvp", value);
//   dispatch({ type: POST_HOTEL_RSVP, payload: hotelRsvp });
// };
