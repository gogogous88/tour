import axios from "axios";
export const FETCH_MAPDATA = "fetch_mapdata";

export function fetchMapData() {
  return async dispatch => {
    const request = await axios.get("/api/delis");

    dispatch({
      type: FETCH_MAPDATA,
      payload: request.data
    });
  };
}
