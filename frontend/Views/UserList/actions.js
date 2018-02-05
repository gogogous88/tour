import axios from "axios";
import { GET_ALL_USERS } from "./types";
import { GET_ALL_USERS_ARRAY } from "./types";

export const getAllUsers = () => async dispatch => {
  const result = await axios.get("/api/user/getAllUser");

  dispatch({ type: GET_ALL_USERS, payload: result });
};

export const getAllUsersArray = () => async dispatch => {
  const resultArray = await axios.get("/api/user/getAllUser");

  dispatch({ type: GET_ALL_USERS_ARRAY, payload: resultArray });
};
