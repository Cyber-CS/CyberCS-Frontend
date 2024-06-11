import { ComponentPropsWithRef } from "react";
import GithubLogoImg from "~/assets/github.png";

export const GithubLogo = ({ ...props }: ComponentPropsWithRef<"img">) => (
  <img src={GithubLogoImg} alt="Logo" {...props} />
);
