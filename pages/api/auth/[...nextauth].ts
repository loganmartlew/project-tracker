import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyEmail, verifyPassword } from '@util/auth/verifyCredentials';

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const emailIsValid = await verifyEmail(credentials.email);
        const passworddIsValid = await verifyPassword(credentials.password);

        if (!emailIsValid || !passworddIsValid) {
          throw new Error('Could not log in');
        }

        return {
          email: credentials.email,
        };
      },
    }),
  ],
});
