import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../session";

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
