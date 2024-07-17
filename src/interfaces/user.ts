import { Session, User } from "next-auth";

export interface TCabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface IUser {
  // user: {
  name: string;
  email: string;
  image: string;
  guestId?: string;

  // };
}

export interface ICustomUser extends User {
  guestId?: string;
}

export interface ICustomSession extends Session {
  user?: ICustomUser;
}

export interface IGuest {
  id: number;
  fullName: string;
  email: string;
  created_at: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
}
