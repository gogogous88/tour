import { GET_ALL_USERS } from "./actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      const result = _.mapKeys(action.payload.data, "_id");
      return { ...state, ...result };

    default:
      return state;
  }
}
