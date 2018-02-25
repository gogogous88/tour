require("./model");

const mongoose = require("mongoose");
const Hotel = mongoose.model("hotels");
const HotelRsvp = mongoose.model("hotelRsvp");

module.exports = app => {
  app.get("/api/all/hotels", async (req, res) => {
    const allHotels = await Hotel.find({});
    res.json(allHotels);
  });
  app.post("/api/hotel/rsvp", async (req, res) => {
    const { user, email, ph_no, hotel, detail } = await req.body;
    console.log("user", user);
    const newHotelRsvp = await new HotelRsvp({
      user,

      email,
      ph_no,
      hotel: {
        id: hotel.id,
        name: hotel.name,
        lat: hotel.lat,
        lng: hotel.lng,
        rate: hotel.rate
      },
      detail: {
        rdate: detail.rdate,
        amount: detail.amount,
        desc: detail.desc
      },
      createDate: Date()
    });
    await newHotelRsvp.save();
    res.json(newHotelRsvp);
  });
};
