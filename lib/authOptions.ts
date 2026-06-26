import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_client_secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const { MongoClient } = await import('mongodb');
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synapselab';
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user || !user.password) {
          await client.close();
          throw new Error('No user found');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        
        await client.close();

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const isAdmin = user.email === 'kdhanvanth98@gmail.com' || user.email?.includes('dhanvanth');
        token.role = (user as any).role || (isAdmin ? 'admin' : 'user');
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'super-secret-synapse-key-for-local-dev-only-do-not-use-in-prod',
};
