const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    sendre_id: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
      require: true,
    },
    pickup_adress: {
      adress_1: String,
      address_2: String,
      pickup_state: String,
      pickup_country: String,
    },
    Deliver_adress: {
      adress_1: String,
      address_2: String,
      Deliver_state: String,
      Deliver_country: String,
    },
    pickup_date: {
      type: Date,
      require: true,
    },
    Deliver_date: {
      type: Date,
      require: true,
    },
    Baggage_Category: {
      type: String,
      require: true,
    },
    Transport_Mode: {
      type: String,
      require: true,
    },
    recipient_name: {
      type: String,
      require: true,
    },
    recipient_phone_no: {
      type: String,
      require: true,
    },
    speical_comment: {
      type: String,
      require: true,
    },
  
  },
  { timestamps: true }
);
const luggage = mongoose.model("luggage", schema);
module.exports = luggage;
