import { House, Info, MagnifyingGlass, SignOut } from "@phosphor-icons/react";
import { Logo } from "~/icons";
import { Link } from "~/components";

export const Header = ({
  onLogout,
  showNavigation,
}: {
  onLogout: () => void;
  showNavigation: boolean;
}) => {
  return (
    <header className="flex gap-48 bg-gray-700 text-white  border-b border-gray-100">
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
                  Nova busca
                </Link>
              </li>
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
