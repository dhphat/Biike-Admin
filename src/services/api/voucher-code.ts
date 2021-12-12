import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface VoucherCodesParams {
  page: number;
  limit: number;
}

interface VoucherCodeIdParams {
  id: number;
}

export const voucherCodeQueryFns = {
  voucherCodes: (params: VoucherCodesParams): Promise<VoucherCodesResponse> =>
    fetchApis.GET("/voucherCodes", params),
  getVoucherCode: (
    params: VoucherCodesParams,
    id: number
  ): Promise<VoucherCodeResponse> =>
    fetchApis.GET(`/voucherCodes/vouchers/${id}`, params),
  createVoucherCode: (
    params: VoucherCodeIdParams
  ): Promise<VoucherCodeResponse> => fetchApis.POST(`/voucherCodes`, params),
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

export interface VoucherCodeResponse extends QueryResponse<VoucherCode> {
  _meta: any;
}
