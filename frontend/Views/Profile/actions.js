import axios from "axios";
const POST_PROFILE = "Post_Profile";
const GET_POSITION = "GET_POSITION";

export const postProfile = (value, callback) => async dispatch => {
  const result = await axios
    .post(`/api/user/profile/${value.username}`, value)
    .then(() => {
      callback();
    });
  dispatch({ type: POST_PROFILE, payload: result });
};

// export const getPosition = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       return { type: GET_POSITION, payload: pos };
//     });
//   }
// };
