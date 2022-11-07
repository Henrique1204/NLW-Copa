import { FastifyInstance } from "fastify";

import { z } from 'zod';
import ShortUniqueId from "short-unique-id";

import prisma from "../lib/prisma";

import authenticate from "../plugins/authenticate";

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

    fastify.post('/pools/:id/join', {
        onRequest: [authenticate],
    }, async ({ body, user }, reply) => {
        const joinPoolBody = z.object({
            code: z.string(),
        });

        const { code } = joinPoolBody.parse(body);

        const pool = await prisma.pool.findUnique({
            where: {
                code,
            },
            include: {
                participants: {
                    where: {
                        userId: user.sub,
                    },
                },
            },
        });

        if (!pool) {
            return reply.status(400).send({
                message: 'Pool not found.',
            });
        }

        if (pool.participants.length > 0) {
            return reply.status(400).send({
                message: 'You already joined this pool.',
            });
        }
    
        if (!pool.ownerId) {
            await prisma.pool.update({
                data: {
                    ownerId: user.sub,
                },
                where: {
                    id: pool.id,
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: user.sub,
            },
        });

        return reply.status(201).send();
    });

    fastify.get('/pools', {
        onRequest: [authenticate],
    } , async ({ user }) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: user.sub,
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        participants: true,
                    },
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            },
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return { pools };
    });
};

export default poolRoutes;
