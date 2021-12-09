import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface AddressesParams {
  page: number;
  limit: number;
}

export const addressQueryFns = {
  addresses: (params: AddressesParams): Promise<AddressesResponse> =>
    fetchApis.GET("/addresses", params),
  address: (id: number): Promise<AddressResponse> =>
    fetchApis.GET(`/address/${id}`),

  createAddress: (body: object): Promise<AddressResponse> =>
    fetchApis.POST(`/addresses`, body),
  updateAddress: ([id, body]: [number, object]): Promise<AddressResponse> =>
    fetchApis.PUT(`/addresses/${id}`, body),
  deleteAddress: (id: number) => fetchApis.DELETE(`/addresses/${id}`),
};

export interface Address {
  addressId: number;
  addressName: string;
  addressDetail: string;
  addressCoordinate: string;
  createdDate: string;
}

export interface AddressesResponse
  extends PaginationQueryResponse<Array<Address>> {}

export interface AddressResponse extends QueryResponse<Address> {}
