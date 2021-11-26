import { FunctionComponent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const ServiceProvider: FunctionComponent = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
