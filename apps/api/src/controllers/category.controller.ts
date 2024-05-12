import prisma from '../prisma';
import { Request, Response } from 'express';

const getCategories = async (req: Request, res: Response) => {
  try {
    const getCategoryPrisma = await prisma.category.findMany({
      select: {
        title: true,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get all category successfully',
      data: getCategoryPrisma.map((data) => {
        return data.title;
      }),
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

const addCategory = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(403).send({
        status: 401,
        success: false,
        message: 'input invalid',
      });
    }

    const checkCategoryPrisma = await prisma.category.findFirst({
      where: {
        title,
      },
    });

    if (checkCategoryPrisma) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'category is exist',
      });
    }

    const addCategoryPrisma = await prisma.category.create({
      data: {
        title,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add category successfully',
      data: addCategoryPrisma,
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

export default { getCategories, addCategory };
