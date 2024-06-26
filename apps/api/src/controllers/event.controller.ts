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

const getStoreEventsActive = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getEventByOwnerIdPrisma = await prisma.event.findMany({
      where: {
        ownerId: user.id,
        eventAt: {
          gt: new Date(),
        },
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
      message: 'get active events successfully',
      data: getEventByOwnerIdPrisma,
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

const getStoreEventsInactive = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getEventByOwnerIdPrisma = await prisma.event.findMany({
      where: {
        ownerId: user.id,
        eventAt: {
          not: { gt: new Date() },
        },
      },
      orderBy: {
        eventAt: 'desc',
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
      message: 'get inactive events successfully',
      data: getEventByOwnerIdPrisma,
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

const getStoreEventsActiveById = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    const getEventByOwnerIdPrisma = await prisma.event.findUnique({
      where: {
        id,
        ownerId: user.id,
        eventAt: {
          gt: new Date(),
        },
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
        EventTransaction: {
          include: {
            TicketTransaction: true,
          },
        },
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add active event by id successfully',
      data: getEventByOwnerIdPrisma,
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

const getStoreEventsInactiveById = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    const getEventByOwnerIdPrisma = await prisma.event.findUnique({
      where: {
        id,
        ownerId: user.id,
        eventAt: {
          not: { gt: new Date() },
        },
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
        EventTransaction: {
          include: {
            TicketTransaction: true,
          },
        },
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add active event by id successfully',
      data: getEventByOwnerIdPrisma,
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

const getEvents = async (req: Request, res: Response) => {
  try {
    const getEventsPrisma = await prisma.event.findMany({
      where: {
        eventAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        eventAt: 'asc',
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
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get events successfully',
      data: getEventsPrisma,
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

const getEventbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getEventsPrisma = await prisma.event.findUnique({
      where: {
        id,
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
        EventTransaction: {
          include: {
            TicketTransaction: {
              select: {
                id: false,
                seatNumberX: true,
                seatNumberY: true,
                createdAt: false,
                updatedAt: false,
                eventTransactionId: false,
              },
            },
          },
        },
        SeatEvent: true,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event by id successfully',
      data: getEventsPrisma,
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

const buyEvent = async (req: Request, res: Response) => {
  try {
    const {
      user,
      total,
      pointsReduce,
      discountReduce,
      seats,
    }: {
      user: any;
      total: number;
      pointsReduce: number;
      discountReduce: string;
      seats: any[];
    } = req.body;
    const { id } = req.params;

    if (!user || !seats || !id) {
      return res.status(202).send({
        status: 202,
        success: false,
        message: 'input invalid',
      });
    }

    let addEventTransaction: {
      id: string;
      buyerId: string;
      pointsReduce: number;
      discountReduce: number;
      total: number;
      createdAt: Date;
      updatedAt: Date;
      eventId: string;
    };

    let actualPointsReduced = 0;

    if (pointsReduce) {
      const getPoints = await prisma.pointsWallet.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          pointsTransactions: true,
        },
      });

      if (getPoints) {
        let remainingPayment = total;

        for (const transaction of getPoints.pointsTransactions) {
          if (remainingPayment > 0) {
            const pointsToDeduct = Math.min(
              transaction.points,
              remainingPayment,
            );

            await prisma.pointsTransaction.update({
              where: {
                id: transaction.id,
              },
              data: {
                points: transaction.points - pointsToDeduct,
              },
            });

            remainingPayment -= pointsToDeduct;
            actualPointsReduced += pointsToDeduct;
          } else {
            break;
          }
        }
      }
    }

    if (discountReduce) {
      const updateDiscountTransaction = await prisma.discountTransaction.update(
        {
          where: {
            id: discountReduce,
          },
          data: {
            isUsed: true,
          },
          include: {
            CouponDiscount: true,
          },
        },
      );

      addEventTransaction = await prisma.eventTransaction.create({
        data: {
          total,
          pointsReduce,
          discountReduce: updateDiscountTransaction.CouponDiscount.total,
          buyerId: user.id,
          eventId: id,
        },
      });
    } else {
      addEventTransaction = await prisma.eventTransaction.create({
        data: {
          total,
          pointsReduce: actualPointsReduced,
          discountReduce: 0,
          buyerId: user.id,
          eventId: id,
        },
      });
    }

    const dataTransactions = seats.map((data) => {
      return {
        eventTransactionId: addEventTransaction.id,
        seatNumberX: data.x,
        seatNumberY: data.y,
      };
    });

    const ticketTransaction = await prisma.ticketTransaction.createMany({
      data: [...dataTransactions],
    });

    const getEvents = await prisma.eventTransaction.findMany({
      where: {
        id: addEventTransaction.id,
      },
      include: {
        TicketTransaction: {
          select: {
            seatNumberX: true,
            seatNumberY: true,
            id: false,
            eventTransactionId: false,
            updatedAt: false,
            createdAt: false,
          },
        },
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'add event transaction successfully',
      data: {
        ...getEvents,
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

const getTransactionActive = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getTransactionActivePrisma = await prisma.eventTransaction.findMany({
      where: {
        buyerId: user.id,
        Event: {
          eventAt: {
            gt: new Date(),
          },
        },
      },
      orderBy: {
        Event: {
          eventAt: 'asc',
        },
      },
      include: {
        Event: true,
        TicketTransaction: true,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event transaction active successfully',
      data: getTransactionActivePrisma,
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

const getTransactionActiveDetail = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(202).send({
        status: 202,
        success: false,
        message: 'input invalid',
      });
    }
    const getTransactionActivePrisma = await prisma.eventTransaction.findUnique(
      {
        where: {
          id,
          buyerId: user.id,
          Event: {
            eventAt: {
              gt: new Date(),
            },
          },
        },
        include: {
          Event: true,
          TicketTransaction: true,
        },
      },
    );

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event transaction active successfully',
      data: getTransactionActivePrisma,
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

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const getTransactionActivePrisma = await prisma.eventTransaction.findMany({
      where: {
        buyerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Event: true,
        TicketTransaction: true,
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event transaction active successfully',
      data: getTransactionActivePrisma,
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

const getTransactionDetail = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(202).send({
        status: 202,
        success: false,
        message: 'input invalid',
      });
    }
    const getTransactionActivePrisma = await prisma.eventTransaction.findUnique(
      {
        where: {
          id,
          buyerId: user.id,
        },
        include: {
          Event: true,
          TicketTransaction: true,
        },
      },
    );

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event transaction successfully',
      data: getTransactionActivePrisma,
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

const findEvents = async (req: Request, res: Response) => {
  try {
    const { title, eventLocation, category, page } = req.query;

    const findLocationsPrisma = await prisma.event.findMany({
      select: {
        eventLocation: true,
      },
    });

    const findCategoiresPrisma = await prisma.category.findMany({
      select: {
        title: true,
      },
    });

    const eventLocationArr = findLocationsPrisma.map((data) => {
      return data.eventLocation;
    });

    const eventCategoriesArr = findCategoiresPrisma.map((data) => {
      return data.title;
    });

    const findTitle = title ? title.toString().split('+').join(' ') : undefined;

    const findEventsForPagePrisma = await prisma.event.findMany({
      where: {
        title: {
          search: title?.toString(),
        },
        eventAt: {
          gt: new Date(),
        },
        eventLocation: {
          in: [
            ...(eventLocation
              ? Array.isArray(eventLocation)
                ? (eventLocation as string[])
                : [eventLocation as string]
              : eventLocationArr),
          ],
        },
        EventCategory: {
          every: {
            Category: {
              title: {
                in: [
                  ...(category
                    ? Array.isArray(category)
                      ? (category as string[])
                      : [category as string]
                    : eventCategoriesArr),
                ],
              },
            },
          },
        },
      },
    });

    const totalData = findEventsForPagePrisma.length;
    let perPage = undefined;
    let offset = undefined;
    let totalPages = 1;

    if (page) {
      perPage = 8;

      totalPages = Math.ceil(totalData / perPage);

      offset = (Number(page) - 1) * perPage;
    }

    const findEventsPrisma = await prisma.event.findMany({
      take: perPage,
      skip: offset,
      where: {
        title: {
          search: findTitle,
        },
        eventAt: {
          gt: new Date(),
        },
        eventLocation: {
          in: [
            ...(eventLocation
              ? Array.isArray(eventLocation)
                ? (eventLocation as string[])
                : [eventLocation as string]
              : eventLocationArr),
          ],
        },
        EventCategory: {
          every: {
            Category: {
              title: {
                in: [
                  ...(category
                    ? Array.isArray(category)
                      ? (category as string[])
                      : [category as string]
                    : eventCategoriesArr),
                ],
              },
            },
          },
        },
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
      },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get event transaction successfully',
      count: findEventsPrisma.length,
      currentPage: Number(page),
      maxPage: totalPages,
      data: findEventsPrisma,
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

const getLocations = async (req: Request, res: Response) => {
  try {
    const getCategoryPrisma = await prisma.event.findMany({
      select: {
        eventLocation: true,
      },
      distinct: ['eventLocation'],
    });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'get all locations successfully',
      data: getCategoryPrisma.map((data) => data.eventLocation),
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

export default {
  addEvent,
  getStoreEventsActive,
  getStoreEventsInactive,
  getStoreEventsActiveById,
  getEvents,
  getEventbyId,
  buyEvent,
  getTransactionActive,
  getTransactionActiveDetail,
  getTransactions,
  getTransactionDetail,
  getStoreEventsInactiveById,
  findEvents,
  getLocations,
};
