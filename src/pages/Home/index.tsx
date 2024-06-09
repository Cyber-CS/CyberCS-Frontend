import { useNavigate } from "react-router-dom";
import { Button } from "~/components";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-700 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48 items-center py-72">
        <Button
          label="Realizar nova varredura"
          onClick={() => navigate("/new-search")}
          className="!bg-gray-200"
        />
      </div>
    </main>
  );
}
