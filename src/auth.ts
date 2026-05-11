import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    userToken?: string;
  }
  interface Session {
    user: {
      userToken?: string;
    } & NextAuthUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userToken?: string;
    userId?: string;
  }
}

export const nextAuthConfig: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Fresh Cart",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (values) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: values?.email,
              password: values?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          },
        );
        const data = await response.json();
        if (data.message === "success") {
          console.log(data.user._id, "user response");
          return {
            id: data.user._id, // Use the actual _id
            email: data.user.email,
            name: data.user.name,
            userToken: data.token,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.userToken = (user as any).userToken;
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        (session.user as any).userToken = token.userToken;
        (session.user as any).id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
