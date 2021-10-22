import { fetchApis } from "..";

interface RoutesParams {
  page: number;
  limit: number;
}

export const routeQueryFns = {
  routes: (params: RoutesParams): Promise<any> =>
    fetchApis.GET("/routes", params),
};
