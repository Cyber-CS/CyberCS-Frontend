import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components";
import { useSecurity } from "~/security";
import { useSession } from "~/session";

function SecurityPage() {
  const { guest, authorized } = useSession();
  const { validating } = useSecurity();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
  };
  useEffect(() => {
    if (guest || authorized) {
      navigate("/");
    }
  }, [guest, authorized, validating]);
  return (
    <div>
      <h1>Security</h1>
      <p>Security content</p>
      <Button label="Continuar" onClick={handleContinue} />
    </div>
  );
}

export { SecurityPage as Component };
