import { FastifyInstance } from "fastify";

import { z } from 'zod';
import ShortUniqueId from "short-unique-id";

import prisma from "../lib/prisma";

const poolRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/pools', async ({ body }, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(body);

        const generateCode = new ShortUniqueId({ length: 6 });

        const pool = await prisma.pool.create({
            data: {
                title,
                code: String(generateCode()).toUpperCase(),
            }
        })

        return reply.status(201).send(pool);
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count };
    });
};

export default poolRoutes;
