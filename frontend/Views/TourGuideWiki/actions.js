import axios from "axios";
import _ from "lodash";
export const GET_PRODUCTS = "get_products";

export const getProducts = () => async dispatch => {
  const { data } = await axios.get("/api/gnc");
  const result = _.mapKeys(data, "_id");

  dispatch({ type: GET_PRODUCTS, payload: result });
};
