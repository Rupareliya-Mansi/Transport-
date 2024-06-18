const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    Sender_Name: {
      type: String,
      required: true,
    },
    sender_Phone_number: {
      type: String,
      require: true,
    },
    Mail: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    otpdateAt: {
      type: Date,
    },

    jwt_token: {
      type: String,
    },
    forgot_password_OTP: {
      type: Number,
    },
    forgot_password_OTP_validetion: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const customer = mongoose.model("customer", schema);
module.exports = customer;

