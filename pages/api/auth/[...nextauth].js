import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword, connectToDatabase } from '../../../utils/utils';

// Signing in user.
export default NextAuth({
  // We're using JWT
  session: {
    strategy: 'jwt',
    // Max age is 10 days
    maxAge: 10 * 24 * 60 * 60,
  },
  // Secret
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        // Our username
        const { username } = credentials;
        // Connecting to database
        const client = await connectToDatabase();
        const coachCollection = client.db('reports').collection('coaches');
        // Finding our username in database
        const user = await coachCollection.findOne({
          username,
        });
        // If it doesn't exist then throw the error
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }
        // Checks the password
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        // If invalid then throw error
        if (!isValid) {
          client.close();
          return { message: 'Wrong password' };
        }
        // But if everything passes, return our usename.
        client.close();
        return { name: user.name, id: user._id, isAdmin: user.isAdmin };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  },
});
