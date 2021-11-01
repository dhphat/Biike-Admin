import { LocalUser } from "./AuthProvider";

const baseUrl = "https://biike-api.azurewebsites.net/api/biike/v1";

const getHeaders = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json; charset=utf-8");
  const stringLocalUser = localStorage.getItem("local_user") || "";
  try {
    const objectLocalUser: LocalUser = JSON.parse(stringLocalUser);
    if (objectLocalUser.token) {
      headers.set("Authorization", `Bearer ${objectLocalUser.token}`);
    }
  } catch (error) {}

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
