import { ComponentPropsWithRef } from "react";
import GitlabLogoImg from "~/assets/gitlab.png";

export const GitlabLogo = ({ ...props }: ComponentPropsWithRef<"img">) => (
  <img src={GitlabLogoImg} alt="Logo" {...props} />
);
