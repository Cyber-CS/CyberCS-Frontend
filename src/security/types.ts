export type SecurityState = {
  channel: string
  recipient: string
  validating: boolean
}

export type SecurityContext = SecurityState & {
  setValidating: (validating: boolean, channel?: string, recipient?: string) => void
  clearValidation: () => void
}
