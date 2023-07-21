import { PrismaClient } from '@prisma/client';

// fix to stop nextjs hot reload from creating multiple prisma clients
// stores a prisma client in a global var that is not affected by hot reload
declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client