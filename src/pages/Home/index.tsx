import { AppWindow } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components";
import { useSession } from "~/session";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSession();
  return (
    <main className="bg-gray-150 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48 items-center py-72">
        <section className="w-full flex gap-12 items-center py-12 border-b border-white">
          <AppWindow size={48} />
          <article>
            <h1 className="text-24 font-semibold">Home</h1>
            <h2>
              Bem vindo de volta,{" "}
              <span className="capitalize font-semibold text-20">
                {`${user?.name?.toLocaleLowerCase()}`}.
              </span>
            </h2>
          </article>
        </section>
        <Button
          label="Realizar nova varredura"
          onClick={() => navigate("/new-search")}
          className="!bg-gray-100"
        />
      </div>
    </main>
  );
}
