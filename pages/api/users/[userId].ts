import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
    if(req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        // since the file format is [userId] the userId is retrieved from the query
        // since this is a api route
        const { userId } = req.query 

        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID')
        }

        const existingUser = await prisma?.user.findUnique({
            where: {                
                id: userId // where id === userId
            }  
        })

        const followersCount = await prisma?.user.count({
            where: {
                // find all the users that are following the current user we are searching for
                 followingIds: {
                    has: userId
                 }
            }
        })

        return res.status(200).json({ ...existingUser, followersCount })

    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
