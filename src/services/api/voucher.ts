import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface VouchersParams {
  page: number;
  limit: number;
}

export const voucherQueryFns = {
  vouchers: (params: VouchersParams): Promise<VouchersResponse> =>
    fetchApis.GET("/vouchers", params),
  voucher: (id: number): Promise<VoucherResponse> =>
    fetchApis.GET(`/voucher/${id}`),
};

export interface Voucher {
  voucherId: number;
  voucherCategoryId: number;
  voucherName: string;
  brand: string;
  startDate: string;
  endDate: string;
  quantity: number;
  remaining: number;
  amountOfPoint: number;
  description: string;
  termsAndConditions: string;
}

export interface VouchersResponse
  extends PaginationQueryResponse<Array<Voucher>> {}

export interface VoucherResponse extends QueryResponse<Voucher> {}
