import { createContext } from "react";
import { ConfigContextType } from "@payment-front/features/config-provider/types.ts";

export const ConfigContext = createContext<ConfigContextType>(
  {} as ConfigContextType,
);