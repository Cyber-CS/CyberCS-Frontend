import { Logo } from "~/icons";

export const Footer = () => {
  return (
    <header className="flex gap-48 bg-gray-700 text-white  border-t border-gray-100">
      <div className="container py-12">
        <Logo className="w-23 h-24" />
      </div>
    </header>
  );
};
