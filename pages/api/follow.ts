import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
    if(req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end()
    }

    try {
        const { userId } = req.body
        const { currentUser } = await serverAuth(req, res)

        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID')
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new Error('Inavlid ID')
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [] )]
        let updatedFollowerIds = [...(user.followerIds || [])];

        if(req.method === 'POST') {
            updatedFollowingIds.push(userId)
            updatedFollowerIds.push(currentUser.id)
        }

        if(req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId)
            updatedFollowerIds = updatedFollowerIds.filter((followerId) => followerId !== currentUser.id);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds 
            }
        })

        await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              followerIds: updatedFollowerIds,
            },
          });

        return res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}
