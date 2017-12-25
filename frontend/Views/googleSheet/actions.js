import axios from "axios";
export const FETCH_NIGHT_DATA = "FETCH_NIGHT_DATA";

export const fetchNightData = () => async dispatch => {
  const data = await axios.get(
    "https://script.googleusercontent.com/macros/echo?user_content_key=r-ETBFaemtOIUz8QOeq_h3gdA3MvFEvM4rcbx5rl-EZiuAF7dkYXJvvb2PDUYA23RhX6C-T49sASySV3BUyJxwswF0Wyf4ygOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1ZsYSbt7G4nMhEEDL32U4DxjO7V7yvmJPXJTBuCiTGh3rUPjpYM_V0PJJG7TIaKp1QNb92pdXxfDNmRsSSL9GvxOwv1zTn6VOd7YJqEJb715ealqnrKh2ZmYddPQ2ymLaKMoU8PGWww31SIMZH6H4k&lib=MbpKbbfePtAVndrs259dhPT7ROjQYJ8yx"
  );
  console.log(data.data.sheet1);
  dispatch({ type: FETCH_NIGHT_DATA, payload: data.data.sheet1 });
};
