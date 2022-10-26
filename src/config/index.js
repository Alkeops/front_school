import  { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 20000,
      onError: error => console.log({error}) //TODO 401 Redirect to login and clear all queries
    },
  },
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NEXT_PUBLIC_NODE_ENV === "development" && (
        <ReactQueryDevtools position="bottom-right" />
      )}
    </QueryClientProvider>
  );
};
