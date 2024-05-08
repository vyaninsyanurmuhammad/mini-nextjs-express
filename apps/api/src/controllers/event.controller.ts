import prisma from '../prisma';
import { Request, Response } from 'express';

const addEvent = async (req: Request, res: Response) => {
  try {
    const {
      user,
      title,
      description,
      price,
      location,
      dateTime,
      categories,
      dimensionX,
      dimensionY,
    } = req.body;

    const { file } = req;

    console.log(
      user,
      title,
      description,
      price,
      location,
      dateTime,
      categories,
      dimensionX,
      dimensionY,
      file,
    );

    if (
      !user ||
      !title ||
      !description ||
      !price ||
      !location ||
      !dateTime ||
      !categories ||
      !dimensionX ||
      !dimensionY ||
      !file
    ) {
      return res.status(202).send({
        status: 202,
        success: false,
        message: 'input invalid',
      });
    }

    const categoriesParsed: string[] = JSON.parse(categories);

    const addEvent = await prisma.event.create({
      data: {
        title,
        description,
        price: Number(price),
        eventAt: new Date(dateTime),
        eventLocation: location,
        eventImage: file.filename,
        User: {
          connect: {
            id: user.id,
          },
        },
        EventRating: {
          create: {},
        },
        SeatEvent: {
          create: {
            dimensionX: Number(dimensionX),
            dimensionY: Number(dimensionY),
          },
        },
      },
    });

    const findcategories = await prisma.category.findMany({
      where: {
        title: {
          in: categoriesParsed,
        },
      },
    });

    const categoriesNorExist = categoriesParsed.filter(
      (itemA) => !findcategories.some((itemB) => itemB.title === itemA),
    );

    if (categoriesNorExist) {
      for (let i = 0; i < categoriesNorExist.length; i++) {
        await prisma.category.create({
          data: {
            title: categoriesNorExist[i],
          },
        });
      }
    }

    const findFinalcategories = await prisma.category.findMany({
      where: {
        title: {
          in: categoriesParsed,
        },
      },
    });

    const eventsCat = findFinalcategories.map((data) => {
      return { eventId: addEvent.id, categoryId: data.id };
    });

    const addEventCategories = await prisma.eventCategory.createMany({
      data: [...eventsCat],
    });

    const findEvent = await prisma.event.findUnique({
      where: {
        id: addEvent.id,
      },
      include: {
        EventCategory: {
          include: {
            Category: {
              select: {
                id: false,
                title: true,
              },
            },
          },
        },
        EventRating: true,
        SeatEvent: true,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add event successfully',
      data: {
        ...findEvent,
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

export default { addEvent };
