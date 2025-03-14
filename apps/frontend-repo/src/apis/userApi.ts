"use server";

import axios from "axios";

import { User } from "../interfaces/user";
import { ResponseAPI } from "@/interfaces/response";
import { ReqGetUser } from "@/interfaces/request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const HEADER = {
  Authorization: process.env.NEXT_PUBLIC_AUTH,
};

export async function fetchUsersAPI(
  props: ReqGetUser
): Promise<ResponseAPI<User[]>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`, {
      headers: HEADER,
      params: props,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}

export async function postUserAPI(
  data: Partial<User>
): Promise<ResponseAPI<User>> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-user-data`,
      data,
      { headers: HEADER }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function updateUserApi(
  userId: string,
  data: Partial<User>
): Promise<ResponseAPI<User>> {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-user-data/${userId}`,
      data,
      { headers: HEADER }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}
