import { fetchApis, QueryResponse } from "..";
import { UserResponse } from "./user";

export const authQueryFns = {
  login: (body: object): Promise<LoginResponse> =>
    fetchApis.POST("/users/login", body),
  verifyUser: (id: number): Promise<UserResponse> =>
    fetchApis.GET(`/users/${id}`),
};

export interface LoginResponse
  extends QueryResponse<{ userId: number; idToken: string }> {}
