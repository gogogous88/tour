import { GET_ALL_USERS } from "./types";
import { GET_ALL_USERS_ARRAY } from "./types";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      const result = _.mapKeys(action.payload.data, "_id");

      return result;

    case GET_ALL_USERS_ARRAY:
      const resultArray = action.payload.data;

      return resultArray;

    default:
      return state;
  }
}
