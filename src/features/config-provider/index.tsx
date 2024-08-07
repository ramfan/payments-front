import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GraphqlClient,
  UnauthorizedException,
} from "@payment-front/shared/api/";
import { ConfigContextType } from "@payment-front/features/config-provider/types.ts";
import { refreshQuery } from "@payment-front/features/config-provider/refreshQuery.ts";
import { useAccessStorage } from "@payment-front/shared/hooks";
import { ConfigContext } from "@payment-front/features/config-provider/config-context.tsx";

export const ConfigProvider: FCC<{ env: { baseUrl: string } }> = ({
  children,
  env,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [client] = useState(new GraphqlClient({ baseUrl: env.baseUrl }));
  const refreshTimerRef = useRef<NodeJS.Timeout | null>();
  const { updateAccessToken, deleteAccessToken, getAccessToken } =
    useAccessStorage();

  const setAuthorizationHeaders = useCallback(
    (accessToken: unknown) => {
      if (typeof accessToken === "string") {
        client.updateHeaders("Authorization", `Bearer ${accessToken}`);
      }
    },
    [client],
  );

  useLayoutEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      setAuthorizationHeaders(accessToken);
      setIsAuthorized(true);
    }
  }, [getAccessToken, setAuthorizationHeaders]);

  useEffect(() => {
    if (!isAuthorized && refreshTimerRef.current) {
      deleteAccessToken();
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, [deleteAccessToken, isAuthorized]);

  useEffect(() => {
    if (isAuthorized && !refreshTimerRef.current) {
      refreshTimerRef.current = setInterval(async () => {
        try {
          const token = await client.request<{ refreshSession: string }>({
            document: refreshQuery,
          });
          updateAccessToken(token.refreshSession);
          setAuthorizationHeaders(token.refreshSession);
        } catch (error) {
          if (error instanceof UnauthorizedException) {
            deleteAccessToken();
            setIsAuthorized(false);
          }
        }
      }, 270_000);
    }
  }, [
    client,
    deleteAccessToken,
    isAuthorized,
    setAuthorizationHeaders,
    updateAccessToken,
  ]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (isAuthorized && !accessToken?.length) {
      setIsAuthorized(false);
    }
  }, [getAccessToken, isAuthorized]);

  const ctx = useMemo<ConfigContextType>(
    () => ({
      client,
      isAuthorized,
      setAuthorizedData: (accessToken) => {
        updateAccessToken(accessToken);
        setAuthorizationHeaders(accessToken);
        setIsAuthorized(true);
      },
    }),
    [client, isAuthorized, setAuthorizationHeaders, updateAccessToken],
  );

  return (
    <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
  );
};
