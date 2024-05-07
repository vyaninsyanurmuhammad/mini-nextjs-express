import prisma from '../prisma';
import { Request, Response } from 'express';

const addEvents = async (req: Request, res: Response) => {
  try {
    const {
      user,
      title,
      description,
      price,
      location,
      eventTime,
      categories,
      seatEvent,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !eventTime ||
      !categories ||
      !seatEvent
    ) {
      return res.status(403).send({
        status: 401,
        success: false,
        message: 'input invalid',
      });
    }

    const addEvent = await prisma.event.create({
      data: {
        title,
        description,
        price,
        eventAt: eventTime,
        eventLocation: location,
        User: {
          connect: {
            id: user.id,
          },
        },
        EventRating: {
          create: {},
        },

        EventCategory: {
          create: [],
        },
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add role successfully',
      data: addEvent,
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

export default { addEvents };
