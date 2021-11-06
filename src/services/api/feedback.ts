import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface FeedbacksParams {
  page: number;
  limit: number;
}

export const feedbackQueryFns = {
  feedbacks: (params: FeedbacksParams): Promise<FeedbacksResponse> =>
    fetchApis.GET("/feedbacks", params),
  feedback: (id: number): Promise<FeedbackResponse> =>
    fetchApis.GET(`/feedback/${id}`),
};

export interface Feedback {
  feedbackId: number;
  userId: number;
  tripId: number;
  tripStar: number;
  feedbackContent: string;
  criteria: string;
  createdDate: string;
  tripTip: number;
}

export interface FeedbacksResponse
  extends PaginationQueryResponse<Array<Feedback>> {}

export interface FeedbackResponse extends QueryResponse<Feedback> {}
