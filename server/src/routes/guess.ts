import { FastifyInstance } from "fastify";

import prisma from "../lib/prisma";

const guessRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();

        return { count };
    });
};

export default guessRoutes;
