import axios from "axios";
const POST_PROFILE = "Post_Profile";

export const updateCoord = value => async dispatch => {
  const result = await axios.post(`/api/user/coords/${value.username}`, value);
  dispatch({ type: POST_PROFILE, payload: result });
};
