import prisma from '../prisma';
import { Request, Response } from 'express';

const getRoles = async (req: Request, res: Response) => {
  try {
    const getRolesPrisma = await prisma.role.findMany();

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get all role successfully',
      data: getRolesPrisma,
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

const addRole = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(403).send({
        status: 401,
        success: false,
        message: 'input invalid',
      });
    }
    const checkRolePrisma = await prisma.role.findFirst({
      where: {
        title,
      },
    });

    if (checkRolePrisma) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'role is exist',
      });
    }


    const addRolePrisma = await prisma.role.create({
      data: {
        title,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add role successfully',
      data: addRolePrisma,
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

export default { getRoles, addRole };
