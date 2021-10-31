const baseUrl = "https://biike-api.azurewebsites.net/api/biike/v1";

const getHeaders = () => {
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmYmRmMjQxZTdjM2E2NTEzNTYwNmRkYzFmZWQyYzU1MjI2MzBhODciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoixJBpbmggUGhhbiBI4bqjaSBUcmnhu4F1IiwicGljdHVyZSI6Imh0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPUhhaStUcmlldSZiYWNrZ3JvdW5kPXJhbmRvbSZyb3VuZGVkPXRydWUmc2l6ZT0xMjgiLCJyb2xlIjoxLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmlpa2UtYzZhNzAiLCJhdWQiOiJiaWlrZS1jNmE3MCIsImF1dGhfdGltZSI6MTYzNDk2MTE3NywidXNlcl9pZCI6IjEiLCJzdWIiOiIxIiwiaWF0IjoxNjM0OTYxMTc3LCJleHAiOjE2MzQ5NjQ3NzcsImVtYWlsIjoiaGFpdHJpZXVAZnB0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjoiKzg0OTgzMzM1MDAwIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrODQ5ODMzMzUwMDAiXSwiZW1haWwiOlsiaGFpdHJpZXVAZnB0LmVkdS52biJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BtGp9BR9o0Xw8vY5YnlJW7vWD4IfrjTMpVxHlHijGVwyZ-v3fZbZbQ_y_6Tfdtzb-YlnWlYSNKyG6kzoPVDlJkzjLkotA102b3C54kP0x04SH6ta2HCMHkyBtc8wwKDIkS19m6QYubuPpehvz2zlZAxxyn7ZCbErOpVr7LnNVpsJ6-Odn8Lfrzq2UgxtGLV_9UAFPXer_FTkpKzjTaqX5B-BuD0SO3cYo5Pj2puFLIzj5KlFQMwUE_aV5kdLiUnz9ZrNBv6zktbxCin75eJ1mro-TF-jM1rTLmGbhlAueLY3bwlF0u1j38vxZInZfw5kW0OkKY9rkJFNabje-WSx6Q"
  );
  return headers;
};

const getStringParams = (params?: object) => {
  if (!params) {
    return "";
  }
  const validParams: Record<string, string> = Object.assign(
    {},
    ...Object.entries(params).map(([key, value]) => ({ [key]: String(value) }))
  );
  const stringParams = new URLSearchParams(validParams);
  return `?${stringParams.toString()}`;
};

export const fetchApis = {
  GET: async (path: string, params?: object) => {
    const response = await fetch(baseUrl + path + getStringParams(params), {
      method: "GET",
      headers: getHeaders(),
    });
    return response.json();
  },
  POST: async (path: string, body: object) => {
    const response = await fetch(baseUrl + path, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  },
  PUT: async (path: string, body: object) => {
    const response = await fetch(baseUrl + path, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  },
  DELETE: async (path: string, params?: object) => {
    const response = await fetch(baseUrl + path + getStringParams(params), {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.json();
  },
};

export interface QueryResponse<TData> {
  data: TData;
  message: string;
}

export interface PaginationQueryResponse<TData> extends QueryResponse<TData> {
  _meta: {
    page: number;
    limit: number;
    count: number;
    totalRecord: number;
  };
}
