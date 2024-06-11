import { Suspense, lazy } from "react";
import { useSession } from "../session";
import { Loading } from "~/components";

const LoginPage = lazy(() => import("./Login/index"));
const HomePage = lazy(() => import("./Home/index"));

function IndexPage() {
  const { authorized } = useSession();

  const renderPage = () => {
    if (!authorized) {
      return <LoginPage />;
    } else {
      return <HomePage />;
    }
  };

  return <Suspense fallback={<Loading /> }>{renderPage()}</Suspense>;
}

export { IndexPage as Component };
