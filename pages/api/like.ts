import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
    if(req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end()
    }

    try {

        const { postId } = req.body
        const { currentUser } = await serverAuth(req, res)

        if(!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID')
        }

        // finds post by id
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post) {
            throw new Error('Inavlid ID')
        }

        let updatedLikedIds = [...(post.likedIds || [])]

        if(req.method === 'POST') {
            // pushing the currentUserId that liked the post
            updatedLikedIds.push(currentUser.id)
            
            // reason for this being in a try catch block
            // is because of there is an error this shouldnt break the like api route

            //! NOTIFICATION BLOCK
            // allow for like notifications
            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
                    }
                })

                if(post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: 'Someone liked your tweet!',
                            userId: post.userId
                        }
                    })

                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    })
                }

            } catch (error) {
                console.log(error)
            }
            //! NOTIFICATION BLOCK
        }

        if(req.method === 'DELETE') {
            // removing currentUserId from liked ids array
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return res.status(200).json(updatedPost)
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
