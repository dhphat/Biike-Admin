import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface DashboardsParams {
  page: number;
  limit: number;
}

export const dashboardQueryFns = {
  dashboard: (): Promise<DashboardResponse> => fetchApis.GET("/dashboard"),
};

export interface StationPercentage {
  stationId: number;
  stationName: string;
  percentage: number;
}

export interface TripStatusPercentage {
  tripStatus: number;
  percentage: number;
}

export interface Dashboard {
  totalUser: number;
  totalNewUser: number;
  totalTrip: number;
  totalRedemption: number;
  totalPointUsedForVoucher: number;
  totalAdsClickCount: number;
  totalKmSaved: number;
  totalFuelSaved: number;
  stationPercentage: Array<StationPercentage>;
  tripStatusPercentage: Array<TripStatusPercentage>;
}

export interface DashboardResponse extends QueryResponse<Dashboard> {}
