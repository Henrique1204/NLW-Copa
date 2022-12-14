import Fastify from "fastify";

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import guessRoutes from "./routes/guess";
import poolRoutes from "./routes/pool";
import userRoutes from "./routes/user";

const bootstrap = async () => {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true
    });

    fastify.register(jwt, {
        secret: 'nlwcopa',
    });

    fastify.register(authRoutes);
    fastify.register(gameRoutes);
    fastify.register(guessRoutes);
    fastify.register(poolRoutes);
    fastify.register(userRoutes);

    await fastify.listen({
        port: 3333,
        // Opção para funcionar no mobile (??)
        host: '0.0.0.0'
    });
};

bootstrap();
