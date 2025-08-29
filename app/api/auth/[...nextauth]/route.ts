import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "tel" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        if (!(await compare(credentials.password, user.password))) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Неверный пароль");
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback user:", user);
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName; // <-- добавляем
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback token:", token);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string; // <-- добавляем
        session.user.lastName = token.lastName as string;
        session.user.phone=token.phone as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
