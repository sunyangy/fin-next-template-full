import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const name = email.split("@")[0];

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        used: true,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "Email not verified" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });

    await prisma.emailVerification.deleteMany({
      where: { email },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
