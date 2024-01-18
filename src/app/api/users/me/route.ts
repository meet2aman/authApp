import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select(
      "-password -isAdmin -createdAt -updatedAt"
    );
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
