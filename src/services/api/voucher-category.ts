import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface VoucherCategoriesParams {
  page: number;
  limit: number;
}

export const voucherCategoryQueryFns = {
  voucherCategories: (
    params: VoucherCategoriesParams
  ): Promise<VoucherCategoriesResponse> =>
    fetchApis.GET("/voucherCategories", params),
  voucherCategory: (id: number): Promise<VoucherCategoryResponse> =>
    fetchApis.GET(`/voucherCategory/${id}`),

  createVoucherCategory: (body: object): Promise<VoucherCategoryResponse> =>
    fetchApis.POST(`/voucherCategories`, body),
  updateVoucherCategory: ([id, body]: [
    number,
    object
  ]): Promise<VoucherCategoryResponse> =>
    fetchApis.PUT(`/voucherCategories/${id}`, body),
  deleteVoucherCategory: (id: number) =>
    fetchApis.DELETE(`/voucherCategories/${id}`),
};

export interface VoucherCategory {
  voucherCategoryId: number;
  categoryName: string;
}

export interface VoucherCategoriesResponse
  extends PaginationQueryResponse<Array<VoucherCategory>> {}

export interface VoucherCategoryResponse
  extends QueryResponse<VoucherCategory> {}
