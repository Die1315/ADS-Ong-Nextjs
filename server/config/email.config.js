const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(mail) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL || "smtp.ethereal.email",
    port: process.env.PORT_MAIL || 587,
    secure: process.env.SECURE_MAIL || false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_MAIL || testAccount.user, // generated ethereal user
      pass: process.env.PASSWORD_MAIL || testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mail);

  console.info("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail( mail).catch(console.error);
module.exports = {
  "sendMail": sendEmail
}