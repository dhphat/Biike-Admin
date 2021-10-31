import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface StationsParams {
  page: number;
  limit: number;
}

export const stationQueryFns = {
  stations: (params: StationsParams): Promise<StationsResponse> =>
    fetchApis.GET("/stations", params),
  station: (id: number): Promise<StationResponse> =>
    fetchApis.GET(`/station/${id}`),
};

export interface Station {
  stationId: number;
  areaId: number;
  name: string;
  address: string;
  coordinate: string;
}

export interface StationsResponse
  extends PaginationQueryResponse<Array<Station>> {}

export interface StationResponse extends QueryResponse<Station> {}
