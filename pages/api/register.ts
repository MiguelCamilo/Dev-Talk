import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
    if(req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { email, username, name, password } = req.body

        if(!email || !password) {
            return res.status(400).send({ message: 'Please fill out required fields.'})
        }

        const existingUserEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const existingUserName = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(existingUserEmail || existingUserName){
            res.status(403).send({ message: 'Email / Username is taken, try again.'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        // creates user and stores user data in the user const
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
