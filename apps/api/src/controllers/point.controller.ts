import prisma from '../prisma';
import { Request, Response } from 'express';

const getPointByOwnerId = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getPointByOwnerIdPrisma = await prisma.pointsWallet.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        pointsTransactions: {
          where: {
            expiredAt: {
              gt: new Date(),
            },
          },
        },
      },
    });

    let totalPoints = 0;

    getPointByOwnerIdPrisma?.pointsTransactions.forEach(
      (data) => (totalPoints += data.points),
    );

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get point successfully',
      data: { ...getPointByOwnerIdPrisma, totalPoints },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

export default { getPointByOwnerId };
