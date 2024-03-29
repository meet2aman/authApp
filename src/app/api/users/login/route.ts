import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    /////check if user exits

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does Not Exist" },
        { status: 400 }
      );
    }

    ///check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }
    /////create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //// create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
