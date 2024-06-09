import { Logo } from "~/icons";

export const Header = () => {
  return (
    <header className="flex gap-48 bg-gray-700 text-white  border-b border-gray-100">
      <div className="container py-12">
        <Logo />
      </div>
    </header>
  );
};
