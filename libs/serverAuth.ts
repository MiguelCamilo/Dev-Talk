import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react'
import { NextApiRequest } from 'next';

const serverAuth = async (req: NextApiRequest) => {
    // getSession from NextAuth to get the user's session if they are logged in
    const session = await getSession({ req })

    if(!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!currentUser) {
        throw new Error('Not signed in')
    }

    return { currentUser }
}

export default serverAuth