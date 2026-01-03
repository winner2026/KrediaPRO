import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Simplified handler - credentials auth removed for build compatibility
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Dynamic import to avoid build-time issues
          const { db } = await import("@/infrastructure/db/client");
          
          const googleProfile = profile as any;
          const userId = user.id || googleProfile?.sub;
          const userEmail = googleProfile?.email || user.email;
          const userName = googleProfile?.name || user.name;
          const userImage = googleProfile?.picture || user.image;

          await db.query(`
            INSERT INTO users (id, email, name, image, last_login)
            VALUES ($1, $2, $3, $4, NOW())
            ON CONFLICT (id) DO UPDATE SET
              email = EXCLUDED.email,
              name = EXCLUDED.name,
              image = EXCLUDED.image,
              last_login = NOW();
          `, [userId, userEmail, userName, userImage]);
          
          return true;
        } catch (error) {
           console.error("Error saving user to DB:", error);
           return true; 
        }
      }
      return true;
    },
  },
});

export const dynamic = 'force-dynamic';
export { handler as GET, handler as POST };
