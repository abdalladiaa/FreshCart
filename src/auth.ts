import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Module augmentation to fix the TypeScript error
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
  }
}

export const nextAuthConfig: NextAuthOptions = {
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
          return {
            id: data.user.email,
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
        token.userToken = user.userToken;
      }
      return token
    },
    session:({session , token})=>{
      return session
    }
  },
  pages:{
    signIn:"/signin"
  }
};
