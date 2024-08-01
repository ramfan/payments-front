import { useCallback } from "react";

const ACCESS_TOKEN_KEY = "jwt_token";

export const useAccessStorage = () => {
  const updateAccessToken = useCallback((accessToken: unknown) => {
    if (typeof accessToken === "string") {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  }, []);

  const deleteAccessToken = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  const getAccessToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  return {
    updateAccessToken,
    deleteAccessToken,
    getAccessToken,
  };
};
