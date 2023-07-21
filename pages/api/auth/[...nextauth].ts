import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/libs/prismadb';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid Credentials');
				}

				// finding user
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid Credentials')
                }

                // comparing hashedPassword from model with what the user passed to credentials
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }

                // if all good return user
                return user
			},
		}),
	],

    // turn on debug if in devlopment
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
});
