import axios from "axios";
const POST_PROFILE = "Post_Profile";

export const postProfile = value => async dispatch => {
  console.log(value);
  const result = await axios.post(`/api/user/profile/${value.username}`, value);
  dispatch({ type: POST_PROFILE, payload: result });
};
