import prisma from '../prisma';
import { Request, Response } from 'express';

const getReveral = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getReveralPrisma = await prisma.reveral.findUnique({
      where: {
        userId: user.id,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get reveral successfully',
      data: getReveralPrisma,
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

export default { getReveral };
