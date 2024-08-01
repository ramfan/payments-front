import { useContext } from "react";
import { ConfigContext } from "@payment-front/features/config-provider/config-context.tsx";

export const useGQLClient = () => useContext(ConfigContext).client;
export const useAuthorization = () => {
  const { isAuthorized, setAuthorizedData } = useContext(ConfigContext);

  return { isAuthorized, setAuthorizedData };
};
