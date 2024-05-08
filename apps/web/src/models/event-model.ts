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
