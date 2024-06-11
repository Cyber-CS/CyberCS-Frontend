import { useSession } from "~/session";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateLayout() {
  const navigate = useNavigate();
  const { authorized } = useSession();
  
  useEffect(() => {
    if (!authorized) navigate("/", { replace: true });
    //eslint-disable-next-line
  }, [authorized]);

  return <Outlet />;
}

export { PrivateLayout as Component };
