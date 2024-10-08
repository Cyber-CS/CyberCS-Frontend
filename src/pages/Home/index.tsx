import { AppWindow, Gear, Fingerprint, ShieldCheck, UserCircle, MagnifyingGlass } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components";
import { useSession } from "~/session";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSession();

  return (
    <main className="bg-gray-150 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48 items-center ">
        <section className="w-full flex gap-12 items-center py-12 border-b border-white">
          <AppWindow size={48} />
          <article>
            <h1 className="text-24 font-semibold">Home</h1>
            <h2>
              Bem-vindo de volta,{" "}
              <span className="capitalize font-semibold text-20">
                {`${user?.name?.toLocaleLowerCase()}`}.
              </span>
            </h2>
          </article>
        </section>

        {/* Botões para funcionalidades */}
        <div className="w-full flex flex-col gap-4">
          {user.role === "1" && (
            <Button
              label="Gerenciamento de Usuários"
              onClick={() => navigate("/user-management")}
              className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
            >
              <Gear size={32} /> {/* Aumentando o tamanho do ícone */}
            </Button>
          )}
          <Button
            label="Verificar Domínio"
            onClick={() => navigate("/virus-total")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <Fingerprint size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
          <Button
            label="Verificar Email"
            onClick={() => navigate("/hibp")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <ShieldCheck size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
          <Button
            label="Perfil"
            onClick={() => navigate("/profile")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <UserCircle size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
          <Button
            label="Realizar nova varredura"
            onClick={() => navigate("/new-search")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <MagnifyingGlass size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
          <Button
            label="Gerenciar Empresas"
            onClick={() => navigate("/gerenciar-empresas")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <Gear size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
          <Button
            label="Pesquisar Codigo Fonte (Marca dágua Empresarial)"
            onClick={() => navigate("/searh-empresa")}
            className="hover:bg-gray-600 flex items-center gap-2 p-12 rounded transition w-full text-lg"
          >
            <MagnifyingGlass size={32} /> {/* Aumentando o tamanho do ícone */}
          </Button>
        </div>
      </div>
    </main>
  );
}
