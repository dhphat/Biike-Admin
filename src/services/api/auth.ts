import { fetchApis } from "..";
import { UserResponse } from "./user";

export const authQueryFns = {
  login: (body: object): Promise<UserResponse> =>
    fetchApis.POST("/login", body),
  verifyUser: (id: number): Promise<UserResponse> =>
    fetchApis.GET(`/user/${id}`),
};
