import { FastifyInstance } from "fastify";

import { z } from "zod";

import prisma from "../lib/prisma";
import authenticate from "../plugins/authenticate";

const gameRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/pools/:id/game', {
        onRequest: [authenticate]
    }, async ({ params, user }) => {
        const getPoolParams = z.object({
            id: z.string(),
        });

        const { id: poolId } = getPoolParams.parse(params);
    
        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                guesses: {
                    where: {
                        participant: {
                            userId: user.sub,
                            poolId,
                        },
                    },
                }
            },
        });

        return { games: games.map(({ guesses, ...game }) => ({
            ...game,
            guess: guesses.length > 0 ? guesses[0] : null,
        })) };
    });
};

export default gameRoutes;
