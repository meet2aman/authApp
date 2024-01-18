import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import jwt, { sign } from "jsonwebtoken";
import { sendEmail } from "../../../../helpers/mailer";

connect();

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "ReQuest Not Hitted" }, { status: 405 });
  }

  const reqBody = await request.json();
  const { email } = reqBody;

  try {
    /// check user email in database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = sign({ userID: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    await user.updateOne({ email }, { $set:{forgotPasswordToken:  token }});

    //   send verification email
    await sendEmail({ email, emailType: "RESET", userID: user._id });

    return NextResponse.json({
      message: "Password reset email sent",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
