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
          // Dynamic imports to avoid build-time issues
          const { db } = await import("@/infrastructure/db/client");
          const bcrypt = await import("bcryptjs");
          
          const res = await db.query(
            "SELECT id, email, name, image, password_hash FROM users WHERE email = $1",
            [credentials.email]
          );
          
          const user = res.rows[0];
          
          if (!user || !user.password_hash) return null;
          
          const isValid = await bcrypt.compare(credentials.password, user.password_hash);
          
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
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Credentials login doesn't need external profile sync
      if (account?.provider === "credentials") return true;

      if (account?.provider === "google") {
        try {
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
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
