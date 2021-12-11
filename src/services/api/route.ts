import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface RoutesParams {
  page: number;
  limit: number;
}

export const routeQueryFns = {
  routes: (params: RoutesParams): Promise<RoutesResponse> =>
    fetchApis.GET("/routes", params),
  route: (id: number): Promise<RouteResponse> => fetchApis.GET(`/route/${id}`),
  createRoute: (body: object): Promise<RouteResponse> =>
    fetchApis.POST(`/routes`, body),
  updateRoute: ([id, body]: [number, object]): Promise<RouteResponse> =>
    fetchApis.PUT(`/routes/${id}`, body),
  deleteRoute: (id: number) => fetchApis.DELETE(`/routes/${id}`),
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
  distance: number;
}

export interface RoutesResponse extends PaginationQueryResponse<Array<Route>> {}

export interface RouteResponse extends QueryResponse<Route> {}
