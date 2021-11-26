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
  createVoucher: (body: object): Promise<VoucherResponse> =>
    fetchApis.POST(`/vouchers`, body),
  uploadVoucherBanner: (body: FormData): Promise<any> =>
    fetchApis.POST_FILE(`/images`, body),
  removeVoucherBanners: ([id, bannerIds]: [number, string[]]): Promise<any> =>
    fetchApis.DELETE(`/vouchers/images`, {
      voucherId: id,
      voucherImageIds: bannerIds,
    }),
  updateVoucherBanners: ([id, body]: [
    number,
    string[]
  ]): Promise<VoucherResponse> =>
    fetchApis.POST(`/vouchers/${id}/images`, body),
  updateVoucher: ([id, body]: [number, object]): Promise<VoucherResponse> =>
    fetchApis.PUT(`/vouchers/${id}`, body),
  deleteVoucher: (id: number) => fetchApis.DELETE(`/vouchers/${id}`),
};

export interface VoucherAddress {
  addressId: number;
  addressName: string;
  addressDetail: string;
  addressCoordinate: string;
  createdDate: string;
}

export interface VoucherImages {
  voucherImageId: number;
  voucherImageUrl: string;
  createdDate: string;
}

export interface Voucher {
  voucherId: number;
  voucherCategoryId: number;
  voucherCategoryName: string;
  voucherName: string;
  brand: string;
  startDate: string;
  endDate: string;
  quantity: number;
  remaining: number;
  amountOfPoint: number;
  description: string;
  termsAndConditions: string;
  voucherAddresses: Array<VoucherAddress>;
  voucherImages: Array<VoucherImages>;
}

export interface VouchersResponse
  extends PaginationQueryResponse<Array<Voucher>> {}

export interface VoucherResponse extends QueryResponse<Voucher> {}
