import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail, generateVerificationCode } from "@/lib/email";
import { emailVerificationSchema } from "@/lib/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = emailVerificationSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分钟后过期

    await prisma.emailVerification.deleteMany({
      where: { email },
    });

    await prisma.emailVerification.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    await sendVerificationEmail(email, code);

    return NextResponse.json(
      { message: "Verification code sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send verification error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
