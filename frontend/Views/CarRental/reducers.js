import _ from "lodash";
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
  FETCH_MISCHARGES
} from "./types";

export default (
  state = {
    access_token: "",
    expires_in: 0,
    token_type: "",
    locations: {},
    ratesResult: {},
    conditions: {},
    placesResult: {},
    placesDetail: {},
    uploadToken: {},
    tax: 0,
    oneWayFee: null,
    selectedVehicle: {},
    misCharges: {}
  },
  action
) => {
  switch (action.type) {
    case FETCH_TOKEN:
      localStorage.setItem("access_token", action.payload.access_token);
      return {
        ...state,
        ...action.payload
      };

    case FETCH_LOCATIONS:
      const locations = _.mapKeys(
        _.filter(action.payload, ["active", true]),
        "locationId"
      );

      return {
        ...state,
        locations
      };

    case FETCH_VEHICLES:
      return {
        ...state,
        vehicleTypes: _.mapKeys(action.payload, "vehicleTypeId")
      };

    case FETCH_RATES:
      return {
        ...state,
        ratesResult: _.mapKeys(action.payload, "vehicleTypeId")
      };

    case FLUSH_RESULTS:
      return {
        ...state,
        ratesResult: {},
        tax: 0,
        oneWayFee: null,
        misCharges: {}
      };

    case FLUSH_SELECTED_VEHICLE:
      return {
        ...state,
        selectedVehicle: {}
      };

    case FETCH_ONE_WAY_FEE:
      return {
        ...state,
        oneWayFee: _.get(action.payload, "fee")
      };

    case UPDATE_SEARCH_CONDITIONS:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          ...action.payload
        }
      };

    case SAVE_SELECTED_VEHICLE:
      return {
        ...state,
        selectedVehicle: action.payload
      };

    case FETCH_MISCHARGES:
      return {
        ...state,
        misCharges: action.payload
      };

    case FETCH_PLACES:
      let placesResult = {};
      if (action.payload.status === "OK") {
        placesResult = _.map(
          action.payload.predictions,
          ({ description, place_id }) => ({
            description,
            id: place_id
          })
        );
      }

      return {
        ...state,
        placesResult
      };

    case FETCH_PLACE_DETAIL:
      const placeDetail = {};

      if (action.payload.status === "OK") {
        let postalCode = "";

        const placeId = _.get(action.payload.result, "place_id");

        const formattedAddress = _.get(
          action.payload.result,
          "formatted_address"
        );

        _.each(
          _.get(action.payload.result, "address_components"),
          ({ long_name, types }) => {
            if (_.includes(types, "postal_code")) {
              postalCode = long_name; // eslint-disable-line
            }
          }
        );

        placeDetail[placeId] = {
          formattedAddress,
          postalCode
        };
      }

      return {
        ...state,
        placesDetail: {
          ...state.placesDetail,
          ...placeDetail
        }
      };

    case FETCH_UPLOAD_TOKEN:
      return {
        ...state,
        uploadToken: action.payload
      };

    case FETCH_TAX:
      return {
        ...state,
        tax: _.get(_.first(action.payload), "value")
      };

    default:
      return state;
  }
};
