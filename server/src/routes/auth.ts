import { FastifyInstance } from "fastify";

import { z } from 'zod';
import fetch from "node-fetch";

import prisma from "../lib/prisma";

import authenticate from "../plugins/authenticate";

const authRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/me', { onRequest: [authenticate] }, async ({ user }) => ({ user }));

    fastify.post('/users', async ({ body }) => {
        const createPoolBody = z.object({
            access_token: z.string(),
        });

        const { access_token } = createPoolBody.parse(body);

        const userData = await (await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).json();

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        });

        const { id: googleId, picture: avatarUrl, ...infos } = userInfoSchema.parse(userData);

        let user = await prisma.user.findUnique({
            where: {
                googleId,
            }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId,
                    avatarUrl,
                    ...infos,
                },
            });
        }

        const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl,
        }, {
            sub: user.id,
            expiresIn: '7 days',
        });

        return { token };
    });
};

export default authRoutes;
