import { GET_CITY } from "./actions";

const INIT = { city: "", state: "" };
export default function(state = INIT, action) {
  switch (action.type) {
    case GET_CITY:
      return action.payload;

    default:
      return state;
  }
}
