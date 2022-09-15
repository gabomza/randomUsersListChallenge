import { ICoordinates, IDate, IPicture, ITimeZone } from "./common";

interface IUserName {
  title: string;
  first: string;
  last: string;
}

interface IUserStreet {
  number: number;
  name: string;
}

interface IUserLocation {
  street: IUserStreet;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: ICoordinates;
  timezone: ITimeZone;
}

interface IUserLogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface IUserId {
  name: string;
  value: string;
}

export interface IUser {
  gender: string;
  name: IUserName;
  location: IUserLocation;
  email: string;
  login: IUserLogin;
  dob: IDate;
  registered: IDate;
  phone: string;
  cell: string;
  id: IUserId;
  picture: IPicture;
  nat: string;
}

export interface IUpdatedUSer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}
