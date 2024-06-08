import { createContext } from "react"

import type { SecurityContext } from "./types"

export default createContext<SecurityContext>({
  validating: false,
  recipient: "",
  channel: "",
  setValidating: () => 0,
  clearValidation: () => 0,
})
