import { useCallback } from "react";
import { useSession } from "~/session";
import { useStorageData, useCookieData } from ".";

export const useLogout = () => {
  const { clearSession } = useSession();
  const { clearAllCookies } = useCookieData();
  const { clearAllStorage } = useStorageData();

  const logout = useCallback(
    (clearCookies = true) => {
      if (clearCookies) {
        clearAllCookies();
        clearAllStorage();
      }
      clearSession();
    },
    [clearSession, clearAllCookies, clearAllStorage]
  );

  return logout;
};
