/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signIn = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};
export const signUp = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
