import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

async function validateCookie(req: NextRequest) {
  const token = req.cookies.get("session");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    const user = verify(value, secret);

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export { validateCookie as GET };
