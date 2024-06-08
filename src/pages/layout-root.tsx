import { Suspense, useEffect } from "react"
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom"
import { Footer, Header, Loading } from "../components"
import { useLogout } from "../hooks/useLogout"
import { useSession } from "../session"

export function RootLayout() {
  const logout = useLogout()
  const { authorized } = useSession()
  const navigate = useNavigate()
  const onLogout = () => {
    if (authorized) {
      navigate("/")
      return logout(false)
    }
    return logout()
  }

  useEffect(() => {
    if (!authorized) onLogout()
    //eslint-disable-next-line
  }, [authorized])

  return (
    <div className="relative flex min-h-screen-d flex-col">
      <Header onLogout={onLogout} showNavigation={authorized} />
      <Suspense fallback={<Loading />} />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </div>
  )
}

export { RootLayout as Component }
