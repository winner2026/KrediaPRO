import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const { prisma } = await import("@/infrastructure/db/client");
          const bcrypt = await import("bcryptjs");
          
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          if (!user || !user.passwordHash) return null;
          
          const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
          
          if (!isValid) return null;
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (e) {
          console.error("Credentials auth error:", e);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;

      if (account?.provider === "google") {
        try {
          const { prisma } = await import("@/infrastructure/db/client");
          
          const userEmail = user.email || "";
          const userName = user.name || "";
          const userImage = user.image || "";

          if (userEmail) {
            await prisma.user.upsert({
              where: { email: userEmail },
              update: {
                name: userName,
                image: userImage,
              },
              create: {
                email: userEmail,
                name: userName,
                image: userImage,
              }
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
