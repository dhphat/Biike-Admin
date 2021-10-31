import { fetchApis, PaginationQueryResponse } from "..";

interface RoutesParams {
  page: number;
  limit: number;
}

export const routeQueryFns = {
  routes: (params: RoutesParams): Promise<RouteResponse> =>
    fetchApis.GET("/routes", params),
};

export interface Route {
  routeId: number;
  departureId: number;
  destinationId: number;
  defaultPoint: number;
}

export interface RouteResponse extends PaginationQueryResponse<Array<Route>> {}
