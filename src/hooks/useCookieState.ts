import Cookies from "js-cookie"
import { useCallback, useRef, useState } from "react"

export const useCookieState = <T>(
  name: string,
  initialValue?: T,
  initialOptions?: Cookies.CookieAttributes,
): [T | undefined, (value: T, options?: Cookies.CookieAttributes) => void, () => void] => {
  if (!name) throw new Error("useCookieState name may not be falsy")

  const initializer = useRef((name: string) => {
    const value = Cookies.get(name) || null
    if (value !== null) return JSON.parse(value)

    initialValue && Cookies.set(name, JSON.stringify(initialValue), initialOptions)
    return initialValue
  })

  const [cookie, setState] = useState<T | undefined>(() => initializer.current(name))

  const setCookie = useCallback(
    (value: T, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, JSON.stringify(value), options)
      setState(value)
    },
    [name],
  )

  const unsetCookie = useCallback(() => {
    Cookies.remove(name)
    setState(undefined)
  }, [name])

  return [cookie, setCookie, unsetCookie]
}
