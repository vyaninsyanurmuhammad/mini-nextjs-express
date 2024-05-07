import { Request, Response } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '@/model/user-model';

const saltRounds = 10;

const signUpUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, reveral } = req.body;

    if (!name || !email || !password) {
      return res.status(403).send({
        status: 403,
        success: false,
        message: 'input invalid',
      });
    }

    const emailCheck: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailCheck) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'email is exist',
      });
    }

    const passwordHashed = await bcrypt.hash(password, saltRounds);

    if (!passwordHashed) {
      return res.status(403).send({
        status: 403,
        success: false,
        message: 'hash password error',
      });
    }

    const existingreveral = await prisma.reveral.findFirst({
      where: {
        code: reveral,
      },
      include: {
        User: {
          include: {
            PointsWallet: true,
          },
        },
      },
    });

    if (!existingreveral) {
      return res.status(403).send({
        status: 403,
        success: false,
        message: 'reveral code not found',
      });
    }

    // Mendapatkan tanggal saat ini
    const currentDate = new Date();

    // Menambahkan 3 bulan ke tanggal saat ini
    const expirationDate = new Date(currentDate);
    expirationDate.setMonth(expirationDate.getMonth() + 3);

    const addUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
        userRoles: {
          create: {
            roleId: 1,
          },
        },
        reveral: {
          create: {},
        },
        PointsWallet: {
          create: {},
        },
        DiscountsWallet: {
          create: {},
        },
      },
      include: {
        userRoles: true,
        PointsWallet: true,
      },
    });

    if (existingreveral) {
      const [addDiscount, addPointToOwneer] = await prisma.$transaction([
        prisma.couponDiscount.create({
          data: {
            title: 'Sign Up Discount',
            total: 10,
            User: {
              connect: {
                id: addUser.id,
              },
            },
            discountTransaction: {
              create: {
                DiscountsWallet: {
                  connect: {
                    userId: addUser.id,
                  },
                },
                expiredAt: expirationDate,
              },
            },
          },
        }),
        prisma.pointsTransaction.create({
          data: {
            expiredAt: expirationDate,
            reveralId: existingreveral.id,
            pointsWalletId: existingreveral.User.PointsWallet!.id,
          },
        }),
      ]);

      console.log(addDiscount, addPointToOwneer);
    }

    const existUser: any = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userRoles: true,
      },
    });

    if (!existUser) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'something wrong',
      });
    }

    const accessToken = jwt.sign(
      {
        id: addUser.id,
        name: addUser.name,
        email: addUser.email,
        role: addUser.userRoles.map((data) => data.roleId),
      },
      process.env.SECRET_KEY ?? 'my-secret-key',
      { expiresIn: '1h' },
    );

    delete existUser.password;

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'sign up successfully',
      data: {
        user: existUser,
        tokens: accessToken,
      },
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

const signInUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const existUser: UserModel | undefined | null =
      await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          userRoles: true,
        },
      });

    if (!existUser) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'invalid email',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password!,
    );

    if (isPasswordCorrect === false) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'invalid password',
      });
    }

    const accessToken = jwt.sign(
      {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.userRoles.map((data) => data.roleId),
      },
      process.env.SECRET_KEY ?? 'my-secret-key',
      { expiresIn: '1h' },
    );

    delete existUser.password;

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'sign in successfully',
      data: {
        user: existUser,
        tokens: accessToken,
      },
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

export default { signUpUser, signInUser };
