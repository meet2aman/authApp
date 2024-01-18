import User from "../models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    //create a hashes token for the email
    const hashedToken = await bcryptjs.hash(userID.toString(), 8);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    ////create nodemailer transport
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAIlER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    /////create mailOptions
    const mailOptions = {
      from: "techocity4@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify Your Email" : "Reset Your Password",
      html: `<p>click <a href="${process.env.DOMAIN_NAME}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify Your Email" : "Reset Your Password"
      }
        or Copy & paste the link below in your browser. <br>
      ${process.env.DOMAIN_NAME}/verifyemail?token=${hashedToken}
      </p>`,
    };
    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
