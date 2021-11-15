import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface AdvertisingsParams {
  page: number;
  limit: number;
}

export const advertisingQueryFns = {
  advertisings: (params: AdvertisingsParams): Promise<AdvertisingsResponse> =>
    fetchApis.GET("/advertisings", params),
  advertising: (id: number): Promise<AdvertisingResponse> =>
    fetchApis.GET(`/advertising/${id}`),
  createAdvertising: (body: object): Promise<AdvertisingResponse> =>
    fetchApis.POST(`/advertisings`, body),
  updateAdvertising: ([id, body]: [
    number,
    object
  ]): Promise<AdvertisingResponse> =>
    fetchApis.PUT(`/advertisings/${id}`, body),
  deleteAdvertising: (id: number) => fetchApis.DELETE(`/advertisings/${id}`),
};

export interface AdvertisingAddress {
  addressId: number;
  addressName: string;
  addressDetail: string;
  addressCoordinate: string;
  createdDate: string;
}

export interface AdvertisingImages {
  advertisingImageId: number;
  advertisingImageUrl: string;
  createdDate: string;
}

export interface Advertising {
  advertisingId: number;
  title: string;
  brand: string;
  startDate: string;
  endDate: string;
  totalClick: number;
  url: number;
  createdDate: number;
  advertisingAddresses: Array<AdvertisingAddress>;
  advertisingImages: Array<AdvertisingImages>;
}

export interface AdvertisingsResponse
  extends PaginationQueryResponse<Array<Advertising>> {}

export interface AdvertisingResponse extends QueryResponse<Advertising> {}
