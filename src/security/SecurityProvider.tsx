import { type ReactNode } from "react"

import Context from "./SecurityContext"
import type { SecurityState } from "./types"
import { useCookieState } from "../hooks/useCookieState"

export const SecurityProvider = ({ children }: { children: ReactNode }) => {
  const [validation, setValidation, clearValidation] = useCookieState<SecurityState>("validation")

  return (
    <Context.Provider
      value={{
        channel: validation?.channel ?? "",
        recipient: validation?.recipient ?? "",
        validating: validation?.validating ?? false,
        setValidating: (validating, channel = "", recipient = "") => {
          setValidation(
            { validating, channel, recipient },
            { expires: new Date(Date.now() + 60 * 1000) }
          )
        },
        clearValidation,
      }}
    >
      {children}
    </Context.Provider>
  )
}
