const rental = require("./controller");

module.exports = app => {
  // site routes
  app.get("/", rental.rentalHome);
  app.get("/pref", rental.pref);
  app.get("/rental*", rental.rentalRest);

  // api routes
  app.get("/api/rental/fetchToken", rental.fetchToken);
  app.post("/api/rental/fetchLocations", rental.fetchLocations);
  app.post("/api/rental/fetchVehicles", rental.fetchVehicles);
  app.post("/api/rental/fetchRates", rental.fetchRates);
  app.post("/api/rental/fetchTax", rental.fetchTax);
  app.post("/api/rental/fetchOneWayFee", rental.fetchOneWayFee);
  app.post("/api/rental/fetchMisCharges", rental.fetchMisCharges);
  app.get("/api/place/search", rental.placeSearch);
  app.get("/api/place/detail", rental.placeDetail);
  app.get("/api/photos/fetchUploadToken", rental.fetchUploadToken);
};
