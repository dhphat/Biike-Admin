import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface AdvertisementsParams {
  page: number;
  limit: number;
}

export const advertisementQueryFns = {
  advertisements: (
    params: AdvertisementsParams
  ): Promise<AdvertisementsResponse> =>
    fetchApis.GET("/advertisements", params),
  advertisement: (id: number): Promise<AdvertisementResponse> =>
    fetchApis.GET(`/advertisement/${id}`),
  createAdvertisement: (body: object): Promise<AdvertisementResponse> =>
    fetchApis.POST(`/advertisements`, body),
  uploadAdvertisementBanner: (body: FormData): Promise<any> =>
    fetchApis.POST_FILE(`/images`, body),
  removeAdvertisementBanners: ([id, bannerIds]: [
    number,
    string[]
  ]): Promise<any> =>
    fetchApis.DELETE(`/advertisements/images`, {
      advertisementId: id,
      advertisementImageIds: bannerIds,
    }),
  updateAdvertisementBanners: ([id, body]: [
    number,
    string[]
  ]): Promise<AdvertisementResponse> =>
    fetchApis.POST(`/advertisements/${id}/images`, body),
  updateAdvertisement: ([id, body]: [
    number,
    object
  ]): Promise<AdvertisementResponse> =>
    fetchApis.PUT(`/advertisements/${id}`, body),
  deleteAdvertisement: (id: number) =>
    fetchApis.DELETE(`/advertisements/${id}`),
};

export interface AdvertisementAddress {
  addressId: number;
  addressName: string;
  addressDetail: string;
  addressCoordinate: string;
  createdDate: string;
}

export interface AdvertisementImages {
  advertisementImageId: number;
  advertisementImageUrl: string;
  createdDate: string;
}

export interface Advertisement {
  advertisementId: number;
  creatorId: number;
  advertisementUrl: string;
  title: string;
  brand: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  totalClickCount: number;
  createdDate: string;
  advertisementAddresses: Array<AdvertisementAddress>;
  advertisementImages: Array<AdvertisementImages>;
}

export interface AdvertisementsResponse
  extends PaginationQueryResponse<Array<Advertisement>> {}

export interface AdvertisementResponse extends QueryResponse<Advertisement> {}
