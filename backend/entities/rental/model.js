/**
 * rental model
 */
const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
  rental_id: Number,
  status: { type: Number, default: 1 },

  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  userName: String,

  location: {
    ploc: String,
    pdate: String,
    rloc: String,
    rdate: String
  },

  vehicle: {
    bags: Number,
    milages: String,
    seats: String,
    vehicleDesc: String,
    vehicleName: String,
    vehicleTypeId: Number
  },

  price: {
    driveForPickFee: Number,
    driveForReturnFee: Number,
    misCharges: Number,
    oneWayFee: Number,
    perDay: Number,
    prePaid: Number,
    restPaid: Number,
    tax: Number,
    total: Number,
    totalDays: Number,
    totalTax: Number,
    vehicleTotalWithTax: Number
  },
  paymentForm: {
    billingAddress1: String,
    billingCity: String,
    billingState: String,
    billingZip: String,
    cardCVV: String,
    cardExpireMonth: String,
    cardExpireYear: String,
    cardHolderName: String,
    cardNumber: String,
    cardType: String,

    email: String,
    firstName: String,
    lastName: String,
    phone: String
  },
  createDate: Date
});

module.exports = mongoose.model("rentals", rentalSchema);
