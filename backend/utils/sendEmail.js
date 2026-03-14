require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "KingCollection <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", response);

  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendEmail;