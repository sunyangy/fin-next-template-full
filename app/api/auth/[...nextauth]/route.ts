// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  debug: true, // 启用NextAuth调试模式
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize called with credentials:', { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Authorize - missing credentials');
          return null;
        }

        const user = await prisma.user.findUnique({ 
          where: { email: credentials.email } 
        });
        
        console.log('Authorize - found user:', user ? { id: user.id, email: user.email } : null);
        
        if (!user || !user.password) {
          console.log('Authorize - no user or password');
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        console.log('Authorize - password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
          console.log('Authorize - invalid password');
          return null;
        }

        const result = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
        
        console.log('Authorize - returning user:', result);
        return result;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      console.log('JWT Callback - token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - token:', token);
      console.log('Session Callback - session before:', session);
      
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
        console.log('Session Callback - Set user ID:', token.id);
      }
      
      console.log('Session Callback - session after:', session);
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
});

// 添加调试日志
const debugHandler = async (req: Request, context: unknown) => {
  console.log('NextAuth route called:', req.method, req.url);
  return handler(req, context);
};

export { debugHandler as GET, debugHandler as POST };