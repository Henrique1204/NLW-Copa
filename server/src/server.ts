import Fastify from "fastify";
import cors from '@fastify/cors';

import { PrismaClient } from '@prisma/client';

import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query'],
});

const bootstrap = async () => {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count };
    });

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();

        return { count };
    });

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();

        return { count };
    });

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

    await fastify.listen({
        port: 3333,
        // Opção para funcionar no mobile (??)
        host: '0.0.0.0'
    });
};

bootstrap();
