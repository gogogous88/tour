import _ from "lodash";
import axios from "axios";
import querystring from "querystring";
import {
  FETCH_TOKEN,
  FETCH_LOCATIONS,
  FETCH_VEHICLES,
  FETCH_TAX,
  FETCH_RATES,
  FETCH_ONE_WAY_FEE,
  UPDATE_SEARCH_CONDITIONS,
  FETCH_PLACES,
  FETCH_PLACE_DETAIL,
  FETCH_UPLOAD_TOKEN,
  FLUSH_RESULTS,
  FLUSH_SELECTED_VEHICLE,
  SAVE_SELECTED_VEHICLE,
  FETCH_MISCHARGES,
  UPDATE_SAVED_EQUIPMENTS,
  UPDATE_SELECTED_ADDRESSES,
  UPDATE_FINAL_PRICE,
  UPDATE_UPLOADED_DOCUMENTS,
  REMOVE_UPLOADED_DOCUMENTS,
  SAVE_PAYMENT_FORM
} from "./types";

export const fetchToken = callback => async dispatch => {
  const { data } = await axios.get("/api/rental/fetchToken");
  dispatch({ type: FETCH_TOKEN, payload: data });
  _.attempt(callback);
};

export const fetchLocations = () => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchLocations",
    querystring.stringify({
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_LOCATIONS, payload: data });
};

export const fetchVehicles = () => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchVehicles",
    querystring.stringify({
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_VEHICLES, payload: data });
};

export const flushResults = () => dispatch => {
  dispatch({ type: FLUSH_RESULTS });
};

export const flushSelectedVehicle = () => dispatch => {
  dispatch({ type: FLUSH_SELECTED_VEHICLE });
};

export const fetchTax = locationId => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchTax",
    querystring.stringify({
      locationId,
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_TAX, payload: data });
};

export const fetchOneWayFee = (
  pickLocation,
  returnLocation
) => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchOneWayFee",
    querystring.stringify({
      pickLocation,
      returnLocation,
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_ONE_WAY_FEE, payload: data });
};

export const fetchRates = params => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchRates",
    querystring.stringify({
      ...params,
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_RATES, payload: data });
};

export const fetchMisCharges = params => async dispatch => {
  const { data } = await axios.post(
    "/api/rental/fetchMisCharges",
    querystring.stringify({
      ...params,
      accessToken: localStorage.getItem("access_token")
    })
  );
  dispatch({ type: FETCH_MISCHARGES, payload: data });
};

export const updateSearchConditions = conditions => dispatch => {
  const conditionsConverted = {
    ...conditions
  };

  if (conditions.pickLocation) {
    conditionsConverted.pickLocation = _.toNumber(
      conditionsConverted.pickLocation
    );
  }

  if (conditions.returnLocation) {
    conditionsConverted.returnLocation = _.toNumber(
      conditionsConverted.returnLocation
    );
  }

  if (conditions.syncLocation) {
    conditionsConverted.syncLocation = conditions.syncLocation !== "false";
  }

  dispatch({ type: UPDATE_SEARCH_CONDITIONS, payload: conditionsConverted });
};

export const saveSelectedVehicle = data => dispatch => {
  dispatch({ type: SAVE_SELECTED_VEHICLE, payload: data });
};

export const fetchPlaces = params => async dispatch => {
  const { data } = await axios.get("/api/place/search", { params });
  dispatch({ type: FETCH_PLACES, payload: data });
};

export const fetchPlaceDetail = params => async dispatch => {
  const { data } = await axios.get("/api/place/detail", { params });
  dispatch({ type: FETCH_PLACE_DETAIL, payload: data });
};

export const fetchUploadToken = () => async dispatch => {
  const { data } = await axios.get("/api/photos/fetchUploadToken");
  dispatch({ type: FETCH_UPLOAD_TOKEN, payload: data });
};

export const updateSavedEquipments = (id, amount) => dispatch => {
  dispatch({
    type: UPDATE_SAVED_EQUIPMENTS,
    payload: { id, amount }
  });
};

export const updateSelectedAddresses = data => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_ADDRESSES,
    payload: data
  });
};

export const updateFinalPrice = data => dispatch => {
  dispatch({
    type: UPDATE_FINAL_PRICE,
    payload: data
  });
};

export const uploadPhoto = (uploadToken, file, callback) => async () => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: e => {
      const returnData = {
        name: file.name,
        preview: file.preview,
        status: "upoading",
        percentage: Math.round(e.loaded / e.total * 100),
        hash: ""
      };
      _.attempt(callback(returnData));
    }
  };

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("token", uploadToken.token);

  const { data } = await axios.post(uploadToken.action, formData, config);

  const returnData = {
    name: file.name,
    preview: file.preview,
    status: "complete",
    percentage: 100,
    hash: data.hash
  };

  _.attempt(callback(returnData));
};

export const updateUploadedDocuments = data => dispatch => {
  dispatch({
    type: UPDATE_UPLOADED_DOCUMENTS,
    payload: data
  });
};

export const removeUploadedDocuments = data => dispatch => {
  dispatch({
    type: REMOVE_UPLOADED_DOCUMENTS,
    payload: data
  });
};

export const savePaymentForm = params => async dispatch => {
  const { data } = await axios.post("/api/rental/makeReservation", params);
  dispatch({
    type: SAVE_PAYMENT_FORM,
    payload: data
  });
};
