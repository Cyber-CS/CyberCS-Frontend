import {
  House,
  Info,
  MagnifyingGlass,
  SignOut, User,
  UserCircle,
} from "@phosphor-icons/react";
import { Logo } from "~/icons";
import { Link } from "~/components";
import { cx } from "class-variance-authority";
import { useSession } from "~/session"; // Importar hook para acessar a sessão do usuário

export const Header = ({
  onLogout,
  showNavigation,
}: {
  onLogout: () => void;
  showNavigation: boolean;
}) => {
  const { user } = useSession(); // Obter informações da sessão do usuário

  const info = [
    {
      icon: <UserCircle size={24} />,
      to: "/profile",
      tip: "hover:after:content-['Perfil']",
    },

    {
      icon: <House size={24} />,
      to: "/",
      tip: "hover:after:content-['Início']",

    },
    {
      icon: <MagnifyingGlass size={24} />,
      to: "/new-search",
      tip: "hover:after:content-['Varredura']",
    },
    {
      icon: <SignOut size={24} />,
      to: "#",
      tip: "hover:after:content-['Sair']",
      onClick: onLogout,
    },
  ];
  return (
    <header className="flex gap-48 bg-gray-150 text-white border-b border-white">
      <section className="container py-12 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <article>
          {showNavigation ? (
            <ul className="flex gap-16">
              {info.map(({ icon, to, tip, onClick }) => (
                <li key={to} className="">
                  <Link
                    to={to}
                    className={cx([
                      "relative hover:bg-gray-600 p-6 rounded-full flex gap-12 font-bold hover:bg-blend-soft-light",
                      "hover:after:absolute hover:after:px-12 hover:after:py-2",
                      "hover:after:bg-gray-600/40 hover:after:rounded-full ",
                      "hover:after:top-36 hover:after:-right-1/2 hover:after:z-1",
                      tip
                    ])}
                    onClick={onClick}
                  >
                    {icon}
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
              ))}
            </ul>
          ) : (
            <ul className="flex gap-24">
              <li>
                <Link
                  to="/about"
                  className="hover:underline flex gap-12 font-bold"
                >
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
