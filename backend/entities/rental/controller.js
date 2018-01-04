const _ = require("lodash");
const axios = require("axios");
const querystring = require("querystring");
const qiniu = require("qiniu");
const keys = require("../../../config/credentials");

axios.defaults.timeout = 20000; // 20 seconds timeout

const hostNavotar = "https://app.navotar.com";
const hostGoogleApis = "https://maps.googleapis.com";

// fetch token from navotar
exports.fetchToken = async (req, res, next) => {
  try {
    const result = await axios.post(
      `${hostNavotar}/api/api/token`,
      querystring.stringify({
        grant_type: keys.navotar_grant_type,
        client_id: keys.navotar_client_id,
        client_secret: keys.navotar_client_secret
      })
    );
    res.json(result.data);
  } catch (e) {
    res.json({
      errorCode: 1001,
      errorMessage: "fetch token failed"
    });
  }
};

// fetch locations from navotar
exports.fetchLocations = async (req, res, next) => {
  const { accessToken } = req.body;
  if (accessToken) {
    try {
      const result = await axios.get(`${hostNavotar}/api/Location/GetAll`, {
        headers: { Authorization: "Bearer " + accessToken }
      });
      res.json(result.data);
    } catch (e) {
      res.json({
        errorCode: 1004,
        errorMessage: e.message
      });
    }
  } else {
    res.json({
      errorCode: 1002,
      errorMessage: "accessToken is not providered"
    });
  }
};

// fetch all vehicle tyles from navotar
exports.fetchVehicles = async (req, res, next) => {
  const { accessToken } = req.body;
  if (accessToken) {
    try {
      const result = await axios.get(`${hostNavotar}/api/VehicleType/GetAll`, {
        headers: { Authorization: "Bearer " + accessToken }
      });
      res.json(result.data);
    } catch (e) {
      res.json({
        errorCode: 1004,
        errorMessage: e.message
      });
    }
  } else {
    res.json({
      errorCode: 1002,
      errorMessage: "accessToken is not providered"
    });
  }
};

// fetch rates from navotar
exports.fetchTax = async (req, res, next) => {
  const { accessToken, locationId } = req.body;
  if (accessToken) {
    try {
      const result = await axios.post(
        `${hostNavotar}/api/Tax/Search`,
        querystring.stringify({
          locationId
        }),
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      );
      res.json(result.data);
    } catch (e) {
      res.json({
        errorCode: 1004,
        errorMessage: e.message
      });
    }
  } else {
    res.json({
      errorCode: 1002,
      errorMessage: "accessToken is not providered"
    });
  }
};

// fetch onewayfee
exports.fetchOneWayFee = async (req, res, next) => {
  const { pickLocation, returnLocation } = req.body;

  // TODO: should fetch from mongodb
  const oneWayFeeData = {
    "5761-5763": 1800,
    "5761-6916": 350,
    "5761-5765": 0,
    "5765-5761": 0,
    "5765-5764": 200,
    "5765-5763": 1800,
    "5765-6916": 350,
    "5764-5761": 280,
    "5764-5765": 280,
    "5764-6916": 350,
    "5764-5763": 1800,
    "5763-5765": 1800,
    "5763-5764": 1800,
    "5763-5761": 1800,
    "5763-6916": 1600,
    "6916-5763": 1600,
    "6916-5764": 400,
    "6916-5765": 400,
    "6916-5761": 400
  };

  const fee = _.get(oneWayFeeData, `${pickLocation}-${returnLocation}`, 0);

  res.json({ fee });
};

// fetch mis charges
exports.fetchMisCharges = async (req, res, next) => {
  const { accessToken, vehicleTypeId, locationId } = req.body;
  if (accessToken) {
    try {
      const result = await axios.post(
        `${hostNavotar}/api/MisCharges/Search`,
        querystring.stringify({
          vehicleTypeId,
          locationId
        }),
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      );
      res.json(result.data);
    } catch (e) {
      res.json({
        errorCode: 1004,
        errorMessage: e.message
      });
    }
  } else {
    res.json({
      errorCode: 1002,
      errorMessage: "accessToken is not providered"
    });
  }
};

// fetch rates from navotar
exports.fetchRates = async (req, res, next) => {
  const { accessToken, locationId, startDate, endDate } = req.body;
  if (accessToken) {
    try {
      const result = await axios.post(
        `${hostNavotar}/api/Rates/Search`,
        querystring.stringify({
          locationId,
          startDate,
          endDate
        }),
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      );
      res.json(result.data);
    } catch (e) {
      res.json({
        errorCode: 1004,
        errorMessage: e.message
      });
    }
  } else {
    res.json({
      errorCode: 1002,
      errorMessage: "accessToken is not providered"
    });
  }
};

// fetch places query from google map api
exports.placeSearch = async (req, res, next) => {
  const url = req.app.locals.isProduction
    ? `${hostGoogleApis}/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        req.query.q
      )}&language=${req.query.lang}&components=country:us&key=${
        keys.google_places_service_key
      }`
    : `http://yale.demo5.cn/api/place/search?q=${encodeURIComponent(
        req.query.q
      )}&lang=${req.query.lang}`;

  try {
    const result = await axios.get(url);
    res.json(result.data);
  } catch (e) {
    res.json({
      errorCode: 1010,
      errorMessage: "google map api request failed"
    });
  }
};

// fetch place detail from google map api
exports.placeDetail = async (req, res, next) => {
  const url = req.app.locals.isProduction
    ? `${hostGoogleApis}/maps/api/place/details/json?placeid=${
        req.query.id
      }&language=${req.query.lang}&key=${keys.google_places_service_key}`
    : `http://yale.demo5.cn/api/place/detail?id=${req.query.id}&lang=${
        req.query.lang
      }`;
  const result = await axios.get(url);

  try {
    res.json(result.data);
  } catch (e) {
    res.json({
      errorCode: 1010,
      errorMessage: "google map api request failed"
    });
  }
};

// create token for qiniu upload
exports.fetchUploadToken = async (req, res, next) => {
  res.json(createUploadCredential());
};

// redirect all requests under /rental to rental home
exports.rentalRest = (req, res, next) => {
  res.render("rental", {
    curPage: "rental"
  });
};

// language preference
exports.pref = (req, res, next) => {
  res.cookie("lang", req.query.lang, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 365 days
  res.redirect("back");
};

// rental home page
exports.rentalHome = (req, res, next) => {
  res.redirect("/rental");
};

function createUploadCredential() {
  const mac = new qiniu.auth.digest.Mac(keys.qiniu_key, keys.qiniu_secret);
  const options = { scope: "yale-image" };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const token = putPolicy.uploadToken(mac);
  const action = keys.qiniu_action;
  return { action, token };
}
