import { FastifyInstance } from "fastify";

import prisma from "../lib/prisma";

const userRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/user/count', async () => {
        const count = await prisma.guess.count();

        return { count };
    });
};

export default userRoutes;
