import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtVerifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('user 0', token);

    if (!token) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, user: any) => {
        console.log(err);

        console.log('user 1', user);

        if (err) return res.sendStatus(403);

        console.log('user 2', user);

        req.body.user = user;

        next();
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

export default { jwtVerifyToken };
