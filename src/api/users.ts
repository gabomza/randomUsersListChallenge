import axios from "axios";
import { IUser } from "../model/user";
import { USERS_API, PAGE_SIZE } from "../config/variables";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    // Sometimes this endpoint returns a 500/520 error due to a CORS error
    const response = await axios.get(`${USERS_API}?results=${PAGE_SIZE}`);
    if (response && response.data) {
      return response.data.results;
    }
  } catch (e) {
    console.error("Error", e);
  }
  return [];
};
