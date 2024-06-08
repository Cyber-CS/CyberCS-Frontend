
import { useCallback } from 'react';
import { useSession } from '../session';
import { useStorageData } from './useStorageData';


export const useLogout = () => {
  const { clearSession } = useSession();
  const { clearAllCookies } = useCookieData();
  const { clearAllStorage } = useStorageData();


  const logout = useCallback((clearCookies = true) => {
    if (clearCookies) {
      clearAllCookies();
      clearAllStorage();
    }
    clearSession();
  }, [clearSession, clearAllCookies, clearAllStorage]);

  return logout;
};
function useCookieData(): { clearAllCookies: any; } {
  throw new Error('Function not implemented.');
}

