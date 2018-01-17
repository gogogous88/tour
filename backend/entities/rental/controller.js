const _ = require("lodash");
const axios = require("axios");
const querystring = require("querystring");
const qiniu = require("qiniu");
const shortid = require("shortid");
const keys = require("../../../config/credentials");
const Mailer = require("./services/Mailer");
const orderTemplate_en = require("./services/emailTemplates/order_en");
const orderTemplate_zh_cn = require("./services/emailTemplates/order_zh-cn");

axios.defaults.timeout = 20000; // 20 seconds timeout
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*#"
);

const hostNavotar = "https://app.navotar.com";
const hostGoogleApis = "https://maps.googleapis.com";

const mongoose = require("mongoose");

//require rentals model
require("./model");
const Rental = mongoose.model("rentals"); //get Rental instance from rentals collection.

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
    "5761-5764": 250,
    "5765-5761": 0,
    "5765-5764": 250,
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

// make reservation
exports.makeReservation = async (req, res, next) => {
  const { vehicle, price, address, paymentForm, uploadedDocuments } = req.body;

  const requestCode = shortid.generate().toUpperCase();

  const order = {
    requestCode,
    vehicle,
    price,
    address,
    paymentForm
  };

  // send an email to customer
  const content = orderTemplate_en(order);
  const mailer1 = new Mailer(
    {
      subject: `Details for Your Yale Van Rental Reservation, Confirmation # ${requestCode}`,
      recipients: [{ email: paymentForm.email }]
    },
    content
  );

  // send an email to administrator
  const paymentContent = `
    <h4>Contact Info</h4>
    <table border="1" cellpadding="8" cellspacing="0" class="wrapper" width="640">
      <tbody>
        <tr>
          <td style="color: gray">First Name</td>
          <td>${paymentForm.firstName}</td>
        </tr>
        <tr>
          <td style="color: gray">Last Name</td>
          <td>${paymentForm.lastName}</td>
        </tr>
        <tr>
          <td style="color: gray">Phone</td>
          <td>${paymentForm.phone}</td>
        </tr>
        <tr>
          <td style="color: gray">Email</td>
          <td>${paymentForm.email}</td>
        </tr>
      </tbody>
    </table>

    <h4>Payment Info</h4>
    <table border="1" cellpadding="8" cellspacing="0" class="wrapper" width="640">
      <tbody>
        <tr>
          <td style="color: gray">Card Holder Name</td>
          <td>${paymentForm.cardHolderName}</td>
        </tr>
        <tr>
          <td style="color: gray">Card Type</td>
          <td>${paymentForm.cardType}</td>
        </tr>
        <tr>
          <td style="color: gray">Card Number</td>
          <td>${paymentForm.cardNumber}</td>
        </tr>
        <tr>
          <td style="color: gray">Expire Month</td>
          <td>${paymentForm.cardExpireMonth}</td>
        </tr>
        <tr>
          <td style="color: gray">Expire Year</td>
          <td>${paymentForm.cardExpireYear}</td>
        </tr>
        <tr>
          <td style="color: gray">CVV</td>
          <td>${paymentForm.cardCVV}</td>
        </tr>
        <tr>
          <td style="color: gray">Billing State</td>
          <td>${paymentForm.billingState}</td>
        </tr>
        <tr>
          <td style="color: gray">Billing City</td>
          <td>${paymentForm.billingCity}</td>
        </tr>
        <tr>
          <td style="color: gray">Billing Address1</td>
          <td>${paymentForm.billingAddress1}</td>
        </tr>
        <tr>
          <td style="color: gray">Billing Address2</td>
          <td>${paymentForm.billingAddress2 || ""}</td>
        </tr>
        <tr>
          <td style="color: gray">Zip</td>
          <td>${paymentForm.billingZip}</td>
        </tr>
      </tbody>
    </table>

    <h4>Uploaded Documents</h4>
    <table border="1" cellpadding="8" cellspacing="0" class="wrapper" width="640">
      <tbody>
        <tr>
          <td style="color: gray">Driver’s License Info</td>
          <td>
            <a href="${`${keys.uploadImageHost}/${
              uploadedDocuments.driverLicense
            }-s1200`}"><img src="${`${keys.uploadImageHost}/${
    uploadedDocuments.driverLicense
  }-s250`}"></a>
 
          </td>
        </tr>
        <tr>
          <td style="color: gray">Insurance Info</td>
          <td><a href="${`${keys.uploadImageHost}/${
            uploadedDocuments.insuranceInfo
          }-s1200`}"><img src="${`${keys.uploadImageHost}/${
    uploadedDocuments.insuranceInfo
  }-s250`}"></a></td>
        </tr>
        </tbody>
      </table>
  `;

  const mailer2 = new Mailer(
    {
      subject: `New Reservation Requested # ${requestCode} - ${new Date().toLocaleString()}`,
      recipients: [{ email: keys.sendGridBccEmail }]
    },
    `${content}${paymentContent}`
  );

  try {
    await mailer1.send();
    await mailer2.send();
  } catch (err) {
    res.status(422).send(err);
  }

  res.json({
    requestCode,
    content
  });
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

//post new reservation to mlab mongodb mongo db
exports.rentalReservation = async (req, res, next) => {
  const { pick } = await req.body.address;
  const { requestCode, user, vehicle, price, paymentForm } = await req.body;
  const reservationDetail = await new Rental({
    location: {
      ploc: pick.address,
      pdate: pick.datetime,
      rloc: req.body.address.return.address,
      rdate: req.body.address.return.datetime
    },
    user: user.userId,
    userName: user.userName,
    rental_id: requestCode,

    vehicle,
    price,
    paymentForm,
    createDate: Date()
  });

  reservationDetail.save().then(() => {
    res.json(reservationDetail);
  });
};

exports.getReservation = async (req, res) => {
  const result = await Rental.find({});
  res.json(result);
};

function createUploadCredential() {
  const mac = new qiniu.auth.digest.Mac(keys.qiniu_key, keys.qiniu_secret);
  const options = { scope: "yale-image" };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const token = putPolicy.uploadToken(mac);
  const action = keys.qiniu_action;
  return { action, token };
}
