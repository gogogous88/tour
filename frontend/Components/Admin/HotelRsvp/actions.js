import { GET_ALL_HOTEL_RSVP } from "./types";
import _ from "lodash";
import axios from "axios";

export const getHotelRsvp = () => async dispatch => {
  const result = await axios.get("/api/hotel/rsvp");
  const data = _.mapKeys(result.data, "createDate");
  console.log("actions", data);
  dispatch({ type: GET_ALL_HOTEL_RSVP, payload: data });
};
