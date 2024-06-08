import { useContext } from "react"

import Context from "./SecurityContext"

export function useSecurity() {
  const context = useContext(Context)
  return context
}
