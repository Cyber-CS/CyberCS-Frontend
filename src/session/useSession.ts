import { useContext } from "react";

import { SessionContext } from "./SessionContext";

export function useSession() {
  const session = useContext(SessionContext);
  return session;
}
