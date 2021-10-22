const baseUrl = "https://biike-api.azurewebsites.net/api/biike/v1";

const getHeaders = () => {
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmYmRmMjQxZTdjM2E2NTEzNTYwNmRkYzFmZWQyYzU1MjI2MzBhODciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVHLGsMahbmcgTWluaCBQaMO6IiwicGljdHVyZSI6Imh0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPU1pbmgrUGh1JmJhY2tncm91bmQ9cmFuZG9tJnJvdW5kZWQ9dHJ1ZSZzaXplPTEyOCIsInJvbGUiOjEsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iaWlrZS1jNmE3MCIsImF1ZCI6ImJpaWtlLWM2YTcwIiwiYXV0aF90aW1lIjoxNjM0ODc5MDAzLCJ1c2VyX2lkIjoiNyIsInN1YiI6IjciLCJpYXQiOjE2MzQ4NzkwMDMsImV4cCI6MTYzNDg4MjYwMywiZW1haWwiOiJtaW5ocGh1QGZwdC5lZHUudm4iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX251bWJlciI6Iis4NDk4MzMzNTAwNiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzg0OTgzMzM1MDA2Il0sImVtYWlsIjpbIm1pbmhwaHVAZnB0LmVkdS52biJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.f_rQMEMqixy_wqXAbf36UGDraa2rIhKB7XtiBbL4wn7Xeov94mDmgZ-Lvf_sPS0udPbMvpD8Dku1fXe3S43Geca35iodzuqJ7HXj9cRwxzmOBZfccy1HWT73NFt7exbDHRBp8vC1RbURYQUz19btZHIt6XgaTffCRM7a9d8QVcHYcLfrxje0GX31oi7xEdslqtmqdigS_MbsZ4w_BxqvcIXzTOTHSdF3N09F4bOVcf7Ez4rHlDf-EYeoOPwFiBdeZzkd6PSiMvA-GsyR83GHR4AwTcB_bBJy0AyvpngsicVqqo3_o5fGPYrvtm9VWQE6wisbXrnufKVaVkEQf7iBkQ"
  );
  return headers;
};

const getStringParams = (params: object) => {
  const validParams: Record<string, string> = Object.assign(
    {},
    ...Object.entries(params).map(([key, value]) => ({ [key]: String(value) }))
  );
  const stringParams = new URLSearchParams(validParams);
  return `?${stringParams.toString()}`;
};

export const fetchApis = {
  GET: async (path: string, params: object) => {
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
};
