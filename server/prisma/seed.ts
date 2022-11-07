import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/henrique1204.png',
        },
    });

    const pool = await prisma.pool.create({
        data: {
            code: 'BOL123',
            title: 'Example pool',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                },
            },
        },
    })

    await prisma.game.create({
        data: {
            date: '2022-11-07T12:00:00.651Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        },
    });

    await prisma.game.create({
        data: {
            date: '2022-11-07T12:00:00.651Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
    
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                poolId: pool.id,
                                userId: user.id,
                            },
                        },
                    },
                },
            },
        },
    });
};

main();
