import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    return NextResponse.json({ status: 400 });
  }

  try {
    connect(); // connecting to database
    const reqBody = await request.json(); // getting data from frontend & converting to JSON
    const { newPassword, token } = reqBody; // Destructuring data from JSON

    //finding document in databsse which has forgotPasswordToken = token(which coming from url which snet by nodemailer to mailtrap)
    const user = await User.findOne({ forgotPasswordToken: token });
    const { forgotPasswordToken } = user; // Destructuring forgotPasswordToken

    //checking if user found or not
    //if not
    if (!user) {
      return NextResponse.json({ error: "invalid Token" }, { status: 400 });
    }
    // if found

    //checking both token are equal or not
    // if not
    if (token !== forgotPasswordToken) {
      console.log("not matched");
    }

    //if matched
    if (forgotPasswordToken === token) {
      //Hashing the newPassword
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(newPassword, salt);
      //updating the hashed NewPassword to password field in db
      user.password = hashedPassword;

      //after sucessfully update remove forgotPasswordToken And ForgotPasswordExpiry to null
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      //and sving the user in db
      const savedUser = await user.save();
    }
    return NextResponse.json({
      message: "Password Changed",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
