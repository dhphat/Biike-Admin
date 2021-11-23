import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface VoucherCodesParams {
  page: number;
  limit: number;
}

export const voucherCodeQueryFns = {
  voucherCodes: (params: VoucherCodesParams): Promise<VoucherCodesResponse> =>
    fetchApis.GET("/voucherCodes", params),
  getVoucherCode: (id: number): Promise<VoucherCodeResponse> =>
    fetchApis.GET(`/voucherCodes/vouchers/${id}`),
  createVoucherCode: (body: object): Promise<VoucherCodeResponse> =>
    fetchApis.POST(`/voucherCodes`, body),
  updateVoucherCode: ([id, body]: [
    number,
    object
  ]): Promise<VoucherCodeResponse> =>
    fetchApis.PUT(`/voucherCodes/${id}`, body),
  deleteVoucherCode: (id: number) => fetchApis.DELETE(`/voucherCodes/${id}`),
};

export interface VoucherCode {
  voucherCodeId: number;
  voucherId: number;
  voucherCodeName: string;
  isRedeemed: boolean;
  createdDate: string;
}

export interface VoucherCodesResponse
  extends PaginationQueryResponse<Array<VoucherCode>> {}

export interface VoucherCodeResponse extends QueryResponse<VoucherCode> {}
