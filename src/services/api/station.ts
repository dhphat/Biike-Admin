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
  createStation: (body: object): Promise<StationResponse> =>
    fetchApis.POST(`/stations`, body),
  updateStation: ([id, body]: [number, object]): Promise<StationResponse> =>
    fetchApis.PUT(`/stations/${id}`, body),
  deleteStation: (id: number) => fetchApis.DELETE(`/stations/${id}`),
};

export interface Station {
  stationId: number;
  areaId: number;
  name: string;
  address: string;
  coordinate: string;
  createdDate: string;
  isDeleted: boolean;
  isCentralPoint: boolean;
}

export interface StationsResponse
  extends PaginationQueryResponse<Array<Station>> {}

export interface StationResponse extends QueryResponse<Station> {}
