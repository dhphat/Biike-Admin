import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface UsersParams {
  page: number;
  limit: number;
}

export const userQueryFns = {
  users: (params: UsersParams): Promise<UsersResponse> =>
    fetchApis.GET("/users", params),
  user: (id: number): Promise<UserResponse> => fetchApis.GET(`/user/${id}`),
  deleteUser: (id: number) => fetchApis.DELETE(`/users/${id}`),
};

export interface UserAddress {
  userAddressId: number;
  userAddressName: string;
  userAddressDetail: string;
  userAddressCoordinate: string;
  userAddressNote: string;
  isDefault: boolean;
}

export interface User {
  userId: number;
  userPhoneNumber: string;
  email: string;
  role: number;
  userFullname: string;
  avatar: string;
  gender: number;
  userStar: number;
  totalPoint: number;
  maxTotalPoint: number;
  isBikeVerified: boolean;
  birthDate: string;
  createdDate: string;
  isDeleted: boolean;
  userAddresses: Array<UserAddress>;
}

export interface UsersResponse extends PaginationQueryResponse<Array<User>> {}

export interface UserResponse extends QueryResponse<User> {}
