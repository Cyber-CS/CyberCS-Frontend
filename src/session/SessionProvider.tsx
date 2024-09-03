import { decodeJwt, type JWTPayload } from "jose";
import type { ReactNode } from "react";

import { SessionContext } from "./SessionContext";
import { useCookieState } from "~/hooks";

type AccessTokenPayload = Required<JWTPayload> & {
  authorized: boolean;
  name: string;
  role: string;
  username: string;
  id: string;
  email: string;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken, clearAccessToken] =
    useCookieState<string>("_access_token");

  const decode = (jwt: string) => decodeJwt(jwt) as AccessTokenPayload;

  const authorized = accessToken ? decode(accessToken).authorized : false;
  const guest = !accessToken ? true : false;
  const user = accessToken
    ? {
        username: decode(accessToken).username,
        name: decode(accessToken).name,
        id: decode(accessToken).sub,
        role: decode(accessToken).role,
        email: decode(accessToken).email,
      }
    : {};

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        authorized,
        guest,
        user,

        setAccessToken: (accessToken: string) =>
          setAccessToken(accessToken, {
            expires: new Date(decode(accessToken).exp * 1000),
            sameSite: "strict",
            secure: import.meta.env.PROD,
          }),
        clearSession: clearAccessToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
