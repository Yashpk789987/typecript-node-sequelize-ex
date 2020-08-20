import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "login",
    user: process.env.email,
    pass: process.env.emailpassword,
  },
});

export const sendMail = async (to, generatedUrl) => {
  var mailOptions = {
    from: process.env.email,
    to: to,
    subject: "Password Reset",
    text:
      "Follow Given Link To Reset Password\nPlease Note That this link will be expired in 10 minutes",
    html: `<html><a href = '${generatedUrl}'>Follow This Link To Reset Password</a></html>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
