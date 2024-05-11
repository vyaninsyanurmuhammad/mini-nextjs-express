import { SeatPositionType } from './seat-position-model';

export type EventForm = {
  title: string;
  description: string;
  location: string;
  dateTime: Date;
  price: number;
  category: string[];
  dimensionX: number;
  dimensionY: number;
  thumbnail: any;
};

export type FetchEvent = {
  status: number;
  success: boolean;
  message: string;
  data: Data;
};

export type FetchEvents = {
  status: number;
  success: boolean;
  message: string;
  data: Data[];
};

export type Data = {
  id: string;
  title: string;
  description: string;
  price: number;
  eventLocation: string;
  eventAt: Date;
  eventImage: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  EventCategory: EventCategory[];
  EventRating: EventRating;
  SeatEvent: SeatEvent;
};

export type EventCategory = {
  id: number;
  eventId: string;
  categoryId: number;
  Category: Category;
};

export type Category = {
  title: string;
};

export type EventRating = {
  id: string;
  eventId: string;
};

export type SeatEvent = {
  id: string;
  eventId: string;
  dimensionX: number;
  dimensionY: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FetchEventDetail = {
  status: number;
  success: boolean;
  message: string;
  data: DataEventDetail;
};

export type DataEventDetail = {
  id: string;
  title: string;
  description: string;
  price: number;
  eventLocation: string;
  eventAt: Date;
  eventImage: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  EventCategory: EventCategory[];
  EventRating: EventRating;
  SeatEvent: SeatEvent;
  EventTransaction: EventTransaction[];
};

export type EventTransaction = {
  id: string;
  buyerId: string;
  pointsReduce: number;
  discountReduce: number;
  total: number;
  eventId: string;
  TicketTransaction: TicketTransaction[];
  createdAt: Date;
  updatedAt: Date;
};

export type TicketTransaction = {
  id: string;
  eventTransactionId: string;
  seatNumberX: number;
  seatNumberY: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FetchEventsHome = {
  status: number;
  success: boolean;
  message: string;
  data: DataEventHome[];
};

export type DataEventHome = {
  id: string;
  title: string;
  description: string;
  price: number;
  eventLocation: string;
  eventAt: Date;
  eventImage: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  EventCategory: EventCategory[];
};

export type FetchEventsHomeDetail = {
  status: number;
  success: boolean;
  message: string;
  data: DataEventHomeDetail;
};

export type DataEventHomeDetail = {
  id: string;
  title: string;
  description: string;
  price: number;
  eventLocation: string;
  eventAt: Date;
  eventImage: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  EventCategory: EventCategory[];
  EventTransaction: EventTransactionDetailHome[];
  SeatEvent: SeatEvent;
};

export type EventTransactionDetailHome = {
  TicketTransaction: TicketTransactionDetailHome[];
};

export type TicketTransactionDetailHome = {
  seatNumberX: number;
  seatNumberY: string;
};

export type BuyEvent = {
  total: number;
  pointsReduce: number;
  discountReduce?: string;
  seats: SeatPositionType[];
};

export type FetchEventTransactions = {
  status: number;
  success: boolean;
  message: string;
  data: EventTransactionTicket[];
};

export type FetchEventTransactionDetail = {
  status: number;
  success: boolean;
  message: string;
  data: EventTransactionTicket;
};

export type getTransactionActiveDetail = {
  status: number;
  success: boolean;
  message: string;
  data: EventTransactionTicket;
};

export type EventTransactionTicket = {
  id: string;
  buyerId: string;
  pointsReduce: number;
  discountReduce: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  eventId: string;
  Event: Event;
  TicketTransaction: TicketTransaction[];
};

export type Event = {
  id: string;
  title: string;
  description: string;
  price: number;
  eventLocation: string;
  eventAt: Date;
  eventImage: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
