import { ComponentPropsWithRef } from "react";
import LogoImg from "~/assets/logo.png";

export const Logo = ({ ...props }: ComponentPropsWithRef<"img">) => (
  <img src={LogoImg} alt="Logo" {...props} />
);
