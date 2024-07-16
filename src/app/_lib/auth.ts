import { ICustomSession, ICustomUser } from "@/src/interfaces/user";
import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      return !!auth?.user;
    },

    async signIn({ user }: { user: ICustomUser }): Promise<boolean> {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({
      session,
      user,
    }: {
      session: ICustomSession;
      user: ICustomUser;
    }) {
      const guest = await getGuest(session?.user?.email);
      if (session.user) {
        session.user.guestId = guest.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
