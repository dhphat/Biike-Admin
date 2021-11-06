import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface BikesParams {
  page: number;
  limit: number;
}

export const bikeQueryFns = {
  bikes: (params: BikesParams): Promise<BikesResponse> =>
    fetchApis.GET("/bikes", params),
  bike: (id: number): Promise<BikeResponse> => fetchApis.GET(`/bike/${id}`),
  // deleteBike: (id: number) => fetchApis.DELETE(`/bikes/${id}`),
};

export interface Bike {
  bikeId: number;
  userId: number;
  plateNumber: string;
  bikeOwner: string;
  bikePicture: string;
  bikeLicensePicture: string;
  plateNumberPicture: string;
  color: string;
  brand: string;
  createdDate: string;
}

export interface BikesResponse extends PaginationQueryResponse<Array<Bike>> {}

export interface BikeResponse extends QueryResponse<Bike> {}
