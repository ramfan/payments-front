import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GraphqlClient } from "@payment-front/shared/api/GraphqlClient.ts";
import { ConfigContextType } from "@payment-front/features/config-provider/types.ts";
import { refreshQuery } from "@payment-front/features/config-provider/refreshQuery.ts";
import { useAccessStorage } from "@payment-front/shared/hooks/use-access-storage.tsx";
import { ConfigContext } from "@payment-front/features/config-provider/config-context.tsx";

export const ConfigProvider: FCC<{ env: { baseUrl: string } }> = ({
  children,
  env,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [client] = useState(new GraphqlClient({ baseUrl: env.baseUrl }));
  const refreshTimerRef = useRef<NodeJS.Timeout>();
  const { updateAccessToken, deleteAccessToken, accessTokenExist } =
    useAccessStorage();

  useLayoutEffect(() => {
    if (accessTokenExist()) {
      setIsAuthorized(true);
    }
  }, [accessTokenExist]);

  useEffect(() => {
    if (isAuthorized && !refreshTimerRef.current) {
      refreshTimerRef.current = setInterval(async () => {
        const token = await client.request<string>({ document: refreshQuery });
        updateAccessToken(token);
      }, 270_000);
    }

    return () => {
      if (refreshTimerRef.current) {
        deleteAccessToken();
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [client, deleteAccessToken, isAuthorized, updateAccessToken]);

  useEffect(() => {
    if (isAuthorized && !accessTokenExist()) {
      setIsAuthorized(false);
    }
  }, [accessTokenExist, isAuthorized]);

  const ctx = useMemo<ConfigContextType>(
    () => ({
      client,
      isAuthorized,
      setAuthorizedData: (accessToken) => {
        updateAccessToken(accessToken);
        setIsAuthorized(true);
      },
    }),
    [client, isAuthorized, updateAccessToken],
  );

  return (
    <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
  );
};
