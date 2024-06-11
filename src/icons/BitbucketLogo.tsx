import { ComponentPropsWithRef } from "react";
import BitbucketLogoImg from "~/assets/bitbucket.png";

export const BitbucketLogo = ({ ...props }: ComponentPropsWithRef<"img">) => (
  <img src={BitbucketLogoImg} alt="Logo" {...props} />
);
