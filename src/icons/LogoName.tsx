import { ComponentPropsWithRef } from "react";
import LogoNameImg from "~/assets/logo-name.png";

export const LogoName = ({ ...props }: ComponentPropsWithRef<"img">) => (
  <img src={LogoNameImg} alt="Logo" {...props} />
);
