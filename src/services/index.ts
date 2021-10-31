const baseUrl = "https://biike-api.azurewebsites.net/api/biike/v1";

const getHeaders = () => {
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1MjU1NWEyMjM3MWYxMGY0ZTIyZjFhY2U3NjJmYzUwZmYzYmVlMGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTMOqIE5n4buNYyBUaOG6o28gVsOibiIsInBpY3R1cmUiOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1UaGFvK1ZhbiZiYWNrZ3JvdW5kPXJhbmRvbSZyb3VuZGVkPXRydWUmc2l6ZT0xMjgiLCJyb2xlIjozLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmlpa2UtYzZhNzAiLCJhdWQiOiJiaWlrZS1jNmE3MCIsImF1dGhfdGltZSI6MTYzNTY2MDMzMSwidXNlcl9pZCI6IjUiLCJzdWIiOiI1IiwiaWF0IjoxNjM1NjYwMzMxLCJleHAiOjE2MzU2NjM5MzEsImVtYWlsIjoidGhhb3ZhbkBmcHQuZWR1LnZuIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOiIrODQ5ODMzMzUwMDQiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4NDk4MzMzNTAwNCJdLCJlbWFpbCI6WyJ0aGFvdmFuQGZwdC5lZHUudm4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.eyt6lVVEfuULueES_Y2glNoJ6dkPgWAXB4t_jdmN406wXjTp5_CZjiVM7iHNwSOX1ygXrz22Pv5CGX6BJbGl-TpGsQeqHwrXSr0xTx8qSd90D-0ZZd6OfBsfEKjMeZrDP8DBRn44rTYNw5rH7nNlMfhIyhrBdK9tdXhNeUcZ1iJMS-kcbpzGTknjg8tl7n_b9JjPqc6TtNa1Tt4Mg1UGPrMKUp8G0SIwl29LVbIK4tegLTnOxpw2e8WMhfc-qTvenZX2B5ZC_hHWHLxAp7IEKCNjDuOoksyYT2gvX3g0jIQpeGo9mNiqDYSV5smQUm9OWyMcOA8YJVB3JvVmmLDa7w"
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
