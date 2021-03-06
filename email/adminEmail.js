const nodemailer = require("nodemailer");
var config = require("config");
const { Admin } = require("../model/admin");
const moment = require("moment");

const sendAdminEmail = async (subject, text) => {
  let date = new Date();
  let FDate = moment(date).format("MM-DD-YYYY");
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: config.get("email"),
      pass: config.get("password"),
    },
  });
  let admin = await Admin.find();
  let sendAdminEmail = [];
  admin.map((item) => {
    sendAdminEmail.push(item.email);
  });
  message = {
    from: "vcsnotifications@safebusinesssolutions.com",
    to: sendAdminEmail,
    subject: "Warning!!!",
    html: `<h4>The Following User Have Covid Symptomns: <a src=${text}></a> </h4>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = sendAdminEmail;
