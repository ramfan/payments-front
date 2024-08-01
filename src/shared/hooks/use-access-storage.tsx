import { useCallback } from "react";

const ACCESS_TOKEN_KEY = "jwt_token";

export const useAccessStorage = () => {
  const updateAccessToken = useCallback((accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }, []);

  const deleteAccessToken = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  const accessTokenExist = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)?.length;
  }, []);

  return {
    updateAccessToken,
    deleteAccessToken,
    accessTokenExist,
  };
};
