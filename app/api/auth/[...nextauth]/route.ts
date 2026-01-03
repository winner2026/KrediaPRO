import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Skip DB operations if we don't have the necessary data
      if (!user || !account || account.provider !== "google") {
        return true;
      }

      try {
        // Dynamic import to avoid build-time initialization
        const { db } = await import("@/infrastructure/db/client");
        
        const googleProfile = profile as { sub?: string; email?: string; name?: string; picture?: string } | undefined;
        const userId = user.id || googleProfile?.sub || "";
        const userEmail = googleProfile?.email || user.email || "";
        const userName = googleProfile?.name || user.name || "";
        const userImage = googleProfile?.picture || user.image || "";

        if (userId && userEmail) {
          await db.query(`
            INSERT INTO users (id, email, name, image, last_login)
            VALUES ($1, $2, $3, $4, NOW())
            ON CONFLICT (id) DO UPDATE SET
              email = EXCLUDED.email,
              name = EXCLUDED.name,
              image = EXCLUDED.image,
              last_login = NOW();
          `, [userId, userEmail, userName, userImage]);
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        // Don't block login on DB errors
      }
      
      return true;
    },
  },
});

export { handler as GET, handler as POST };
