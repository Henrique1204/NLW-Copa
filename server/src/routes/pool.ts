import { FastifyInstance } from "fastify";

import { z } from 'zod';
import ShortUniqueId from "short-unique-id";

import prisma from "../lib/prisma";

const poolRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/pools', async ({ body, jwtVerify, user }, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(body);

        const generateCode = new ShortUniqueId({ length: 6 });
        const code = String(generateCode()).toUpperCase();

        try {
            await jwtVerify();

            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: user.sub,

                    participants: {
                        create: {
                            userId: user.sub,
                        }
                    }
                },
            });
        } catch (_) {
            await prisma.pool.create({
                data: { title, code },
            });
        } finally {
            return reply.status(201).send({ code });
        }
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count };
    });
};

export default poolRoutes;
