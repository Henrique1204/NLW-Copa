import { FastifyInstance } from "fastify";

import { z } from "zod";

import prisma from "../lib/prisma";

import authenticate from "../plugins/authenticate";

const guessRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/guesses/count', async () => {
        const count = await prisma.user.count();

        return { count };
    });

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

    fastify.post('/pools/:poolId/games/:gameId/guesses', {
        onRequest: [authenticate]
    }, async ({ body, params, user }, reply) => {
        const createGuessParams = z.object({
            poolId: z.string(),
            gameId: z.string(),
        });

        const createGuessBody = z.object({
            firstTeamPoints: z.number(),
            secondTeamPoints: z.number(),
        });

        const { gameId, poolId } = createGuessParams.parse(params);
        const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(body);

        const participant = await prisma.participant.findUnique({
            where: {
                userId_poolId: {
                    poolId,
                    userId: user.sub,
                },
            },
        });

        if (!participant) {
            return reply.status(400).send({
                message: 'You\'r not allowed to create a guess inside this pool.',
            });
        }

        const guess =  await prisma.guess.findUnique({
            where: {
                participantId_gameId: {
                    gameId,
                    participantId: participant.id,
                }
            },
        });

        if (guess) {
            return reply.status(400).send({
                message: 'You already sent a guess to this game on this pool.'
            });
        }

        const game = await prisma.game.findUnique({
            where: {
                id: gameId,
            },
        });

        if (!game) {
            return reply.status(400).send({
                message: 'Game not found.'
            });
        }

        if (game.date < new Date()) {
            return reply.status(400).send({
                message: 'You connot send guesses after game.',
            });
        }
    
        await prisma.guess.create({
            data: {
                gameId,
                participantId: participant.id,
                firstTeamPoints,
                secondTeamPoints,
            }
        });

        return reply.status(201).send();
    });
};

export default guessRoutes;
