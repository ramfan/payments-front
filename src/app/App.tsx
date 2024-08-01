import { AppRoutes } from "./routing";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@payment-front/shared/i18n";
import { ConfigProvider } from "@payment-front/features";

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

const queryClient = new QueryClient();

const env = {
  baseUrl: "http://localhost:8080/graphql",
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider env={env}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
