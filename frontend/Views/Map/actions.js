import axios from "axios";
export const FETCH_MAPDATA = "fetch_mapdata";
export const FETCH_MAP_ATTR = "FETCH_MAP_ATTR";

export function fetchMapData() {
  return async dispatch => {
    const request = await axios.get("http://localhost:5000/api/delis");

    dispatch({
      type: FETCH_MAPDATA,
      payload: request.data
    });
  };
}

export function fetchAttrs() {
  return async dispatch => {
    const request = await axios.get("http://localhost:5000/api/attrs");

    dispatch({
      type: FETCH_MAP_ATTR,
      payload: request.data
    });
  };
}
