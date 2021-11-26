import { fetchApis, PaginationQueryResponse, QueryResponse } from "..";

interface TransactionsParams {
  page: number;
  limit: number;
}

export const transactionQueryFns = {
  transactions: (params: TransactionsParams): Promise<TransactionsResponse> =>
    fetchApis.GET("/momoTransactions/all", params),
};

export interface Transaction {
  momoTransactionId: number;
  userId: number;
  transactionId: number;
  orderId: string;
  amount: number;
  point: number;
  conversionRate: number;
  createdDate: string;
}

export interface TransactionsResponse
  extends PaginationQueryResponse<Array<Transaction>> {}

export interface TransactionResponse extends QueryResponse<Transaction> {}
