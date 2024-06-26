import { LogoName } from "~/icons";

export const Footer = () => {
  return (
    <footer className="flex gap-48 bg-gray-150 text-white border-t border-white">
      <div className="container py-12 flex justify-between">
        <LogoName className="w-23 h-24" />
        <p>
          © 2024 <span className="font-semibold">CyberCS - Data analyzer</span> - All rights
          reserved
        </p>
      </div>
    </footer>
  );
};
