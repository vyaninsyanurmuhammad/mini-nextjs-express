import prisma from '../prisma';
import { Request, Response } from 'express';

const getDiscountsByOwnerId = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const getDiscountsByOwnerIdPrisma = await prisma.discountsWallet.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        discountTransaction: {
          where: {
            expiredAt: {
              gt: new Date(),
            },
          },
          include: {
            CouponDiscount: true,
          },
        },
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get discount vouchers successfully',
      data: { ...getDiscountsByOwnerIdPrisma },
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

export default { getDiscountsByOwnerId };
