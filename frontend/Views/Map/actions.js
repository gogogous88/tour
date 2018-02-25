import axios from "axios";
export const FETCH_MAPDATA = "fetch_mapdata";
export const FETCH_MAP_ATTR = "FETCH_MAP_ATTR";
export const FETCH_MAP_HOTEL = "FETCH_MAP_HOTEL";

export function fetchMapData() {
  return async dispatch => {
    const request = await axios.get("/api/delis");

    dispatch({
      type: FETCH_MAPDATA,
      payload: request.data
    });
  };
}

export function fetchAttrs() {
  return async dispatch => {
    const request = await axios.get("/api/attrs");

    dispatch({
      type: FETCH_MAP_ATTR,
      payload: request.data
    });
  };
}

export const fetchHotels = () => {
  return async dispatch => {
    const request = await axios.get("/api/all/hotels");
    dispatch({ type: FETCH_MAP_HOTEL, payload: request.data });
  };
};
