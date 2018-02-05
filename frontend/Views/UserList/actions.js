import axios from "axios";

export const GET_ALL_USERS = "get_all_users";

export const getAllUsers = () => async dispatch => {
  const result = await axios.get("/api/user/getAllUser");

  dispatch({ type: GET_ALL_USERS, payload: result });
};
