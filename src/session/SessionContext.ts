import { createContext } from "react";

type SessionContextType = {
  accessToken?: string;
  authorized: boolean;
  guest: boolean;
  user: {
    username?: string;
    id?: string;
    name?: string;
    role?: string;
  };

  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
};

const INITIAL_STATE: SessionContextType = {
  accessToken: undefined,
  authorized: false,
  guest: true,
  user: {},

  setAccessToken: () => 0,
  clearSession: () => 0,
};

export const SessionContext = createContext(INITIAL_STATE);