const asyncHandler = require("../middelware/async");
const customer = require("../model/customer_info");

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.addcustomer = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  let data = await customer.findOne({
    Mail: req.body.Mail,
  });
  const body = req.body;
  const inserUser = bcrypt.hashSync(req.body.password, 10);
  body.password = inserUser;
  let adUser;
  if (!data) {
    adUser = await customer.create(body);
    // await OTP.create({ Mail: req.body.Mail });
  } else {
    res.send({
      message: " this email id is alredy  existing",
    });
  }
  res.send({
    data: adUser,
  });
});

exports.signin = async (req, res, next) => {
  try {
    const data = await customer.findOne({ Mail: req.body.email }).lean();
    const senddata = await customer
      .findOne({ Mail: req.body.email }, { Mail: 1 })
      .lean();
    if (data && (await bcrypt.compare(req.body.password, data.password))) {
      const token = jwt.sign({ id: data._id }, "mansi", { expiresIn: "30d" });
      //  await customer.findOneAndUpdate({ Mail: req.body.email },{$set :{
      //   jwt_token : token
      // }})
      senddata.token = token;
      res.json({ data: senddata });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.change_password = asyncHandler(async (req, res, next) => {
  const data = await customer.findOne({ Mail: req.body.email }).lean();
  if (!data) {
    res.send({
      message: "your email id is invalid",
    });
  }
  const inserdata = bcrypt.hashSync(req.body.change_password, 10);
  let check_password = await bcrypt.compare(req.body.password, data.password);
  if (check_password && req.body.password == req.body.change_password) {
    res.send({
      message: "password is already existing",
    });
  } else if (!check_password) {
    res.send({
      message: "your password is incorrect",
    });
  } else {
    update_data = await customer.findOneAndUpdate(
      { Mail: req.body.email },
      { $set: { password: inserdata } }
    );
    res.send({
      message: "Your Password has been successfully changed",
    });
  }
  res.send({
    message: "Your can not change the password",
  });
});

exports.forgot_password = asyncHandler(async (req, res, next) => {

  if (!req.body.password) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await customer.findOneAndUpdate(
      { Mail: req.body.email },
      {
        $set: {
          forgot_password_OTP: otp, // Set the OTP initially
          otpdateAt: Date.now()+20000, // Set expiration time
        },
      },
      { returnDocument: "after" }
    );
    data = `Your OTP is: ${otp}`;
    subject = "Your OTP for password reset";
    await sendOTPEmail(req.body.email, subject, data);
  }
  res.send({
    message: "OTP is genreted please enter in  20 sec ",
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mansirupareliyawz@gmail.com",
    pass: "gbyk ffzc ywic ykmh",
  },
});

async function sendOTPEmail(email, subject, text) {
  try {
    await transporter.sendMail({
      from: "mansirupareliyawz@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

exports.conformationOTP = asyncHandler(async (req, res, next) => {
  const finddata = await customer.findOne({
    Mail: req.body.Mail,
    // forgote_password_OTP: req.body.forgote_password_OTP,
  });
  
  if (finddata) {
    console.log(finddata.otpdateAt);
    console.log(Date.now())
    if (finddata.forgot_password_OTP == req.body.forgot_password_OTP  &&    finddata.otpdateAt >= Date.now() ) {
      await customer.findOneAndUpdate(
        { Mail: req.body.Mail },
        {
          $set: {
            forgot_password_OTP_validetion: true,
          },
        }
      );
      res.send({
        message: "your OTP is valid",
      });
    } else {
      res.send({
        message: "your OTP is expired",
      });
    }
  } else {
    res.send({
      message: "Your email id is invalid",
    });
  }
});

exports.forgotchange_password = asyncHandler(async (req, res, next) => {
  const data = await customer.findOne({ Mail: req.body.email }).lean();
  const inserdata = bcrypt.hashSync(req.body.change_password, 10);
  if(data){
  if (data.forgot_password_OTP_validetion == true) {
    update_data = await customer.findOneAndUpdate(
      { Mail: req.body.email },
      { $set: { password: inserdata } },
      { returnDocument: "after" }
    );
    await customer.findOneAndUpdate(
      { Mail: req.body.email },
      { $set: { forgot_password_OTP_validetion: false } },
      { returnDocument: "after" }
    );
    res.send({
      message: "Your Password has been successfully changed",
    });
  }
  res.send({
    message: "Your can not change the password",
  });
}
 else
  {
    res.send({
      message: "your email id is invalid",
    })
  }
});

