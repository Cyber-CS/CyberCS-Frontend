import {
  House,
  Info,
  MagnifyingGlass,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { Logo } from "~/icons";
import { Link } from "~/components";
import { cx } from "class-variance-authority";

export const Header = ({
  onLogout,
  showNavigation,
}: {
  onLogout: () => void;
  showNavigation: boolean;
}) => {
  const info = [
    {
      icon: <UserCircle size={24} />,
      to: "/profile",
      tip: "Perfil",
    },

    {
      icon: <House size={24} />,
      to: "/",
      tip: "Início",
    },
    {
      icon: <MagnifyingGlass size={24} />,
      to: "/new-search",
      tip: "Nova busca",
    },
    {
      icon: <SignOut size={24} />,
      to: "#",
      tip: "Sair",
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
                      "hover:after:absolute hover:after:p-12",
                      " hover:after:bg-gray-600/40 hover:after:rounded-full ",
                      "hover:after:top-24 hover:after:left-1/2 hover:after:z-1",
                      `hover:after:content-['${tip}']`,
                    ])}
                    onClick={onClick}
                  >
                    {icon}
                  </Link>
                </li>
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
