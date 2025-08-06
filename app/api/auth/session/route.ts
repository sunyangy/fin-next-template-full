import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

interface ExtendedSession {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export async function GET() {
  try {
    const session = (await getServerSession()) as ExtendedSession;

    console.log("Session API - Full session:", session);
    console.log("Session API - Session exists:", !!session);
    console.log("Session API - User exists:", !!session?.user);
    console.log("Session API - User object:", session?.user);
    console.log("Session API - User ID:", session?.user?.id);
    console.log("Session API - User email:", session?.user?.email);

    if (session?.user) {
      console.log("Session API - User data:", session.user);
      const userWithId = {
        ...session.user,
        id: session.user.id || session.user.email,
      };
      return NextResponse.json({
        user: userWithId,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24小时后过期
      });
    } else {
      console.log("Session API - No user found");
      return NextResponse.json({
        user: null,
        expires: null,
      });
    }
  } catch (error) {
    console.error("获取会话信息时出错:", error);
    return NextResponse.json({ error: "获取会话信息失败" }, { status: 500 });
  }
}
