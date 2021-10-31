import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface RoutesParams {
  page: number;
  limit: number;
}

export const routeQueryFns = {
  routes: (params: RoutesParams): Promise<RoutesResponse> =>
    fetchApis.GET("/routes", params),

  route: (id: number): Promise<RouteResponse> => fetchApis.GET(`/route/${id}`),
};

export interface Route {
  routeId: number;
  departureId: number;
  destinationId: number;
  defaultPoint: number;
  areaId: number;
  departureName: string;
  destinationName: string;
  createdDate: string;
  isDeleted: boolean;
}

export interface RoutesResponse extends PaginationQueryResponse<Array<Route>> {}

export interface RouteResponse extends QueryResponse<Route> {}
