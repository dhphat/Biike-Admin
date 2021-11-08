import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface TripsParams {
  page: number;
  limit: number;
}

export const tripQueryFns = {
  trips: (params: TripsParams): Promise<TripsResponse> =>
    fetchApis.GET("/trips", params),
  trip: (id: number): Promise<TripResponse> => fetchApis.GET(`/trip/${id}`),
};

export interface Trip {
  tripId: number;
  keerId: number;
  keerFullname: string;
  bikerId: number;
  bikerFullname: string;
  routeId: number;
  departureStationName: string;
  destinationStationName: string;
  createdDate: string;
  bookTime: string;
  pickupTime: string;
  finishedTime: string;
  cancelTime: string;
  status: number;
  plateNumber: string;
  isScheduled: boolean;
  cancelPersonId: number;
  cancelPersonFullname: string;
  cancelReason: string;
}

export interface TripsResponse extends PaginationQueryResponse<Array<Trip>> {}

export interface TripResponse extends QueryResponse<Trip> {}
