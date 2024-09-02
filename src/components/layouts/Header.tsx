import { House, Info, MagnifyingGlass, SignOut, User } from "@phosphor-icons/react";
import { Logo } from "~/icons";
import { Link } from "~/components";
import { useSession } from "~/session"; // Importar hook para acessar a sessão do usuário

export const Header = ({
  onLogout,
  showNavigation,
}: {
  onLogout: () => void;
  showNavigation: boolean;
}) => {
  const { user } = useSession(); // Obter informações da sessão do usuário

  return (
    <header className="flex gap-48 bg-gray-150 text-white border-b border-white">
      <section className="container py-12 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <article>
          {showNavigation ? (
            <ul className="flex gap-24">
              <li>
                <Link to="/" className="hover:underline flex gap-12 font-bold">
                  <House size={24} />
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/new-search"
                  className="hover:underline flex gap-12 font-bold"
                >
                  <MagnifyingGlass size={24} />
                  Nova varredura
                </Link>
              </li>
              {user.role === "1" && ( // Verifica se o usuário é admin
                <li>
                  <Link
                    to="/user-management"
                    className="hover:underline flex gap-12 font-bold"
                  >
                    <User size={24} />
                    Gerenciamento de Usuários
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="#"
                  className="hover:underline flex gap-12 font-bold"
                  onClick={onLogout}
                >
                  <SignOut size={24} />
                  Sair
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-24">
              <li>
                <Link to="/about" className="hover:underline flex gap-12 font-bold">
                  <Info size={24} />
                  Sobre nós
                </Link>
              </li>
            </ul>
          )}
        </article>
      </section>
    </header>
  );
};
