import { Info } from "@phosphor-icons/react";
import { ModalGeneric } from ".";
import { Button } from "../Button";

type ContentProps = ModalGeneric.DialogContentProps & {
  title: string;
  description: string;
  onClose?: () => void;
};

export const Content = ({ description, title, onClose }: ContentProps) => (
  <ModalGeneric.Content className="flex w-full max-w-360 flex-col gap-20 data-[state=closed]:animate-popOut data-[state=open]:animate-popIn lg:max-w-[25rem]">
    <div>
      <div className="flex w-full items-center justify-center">
        <Info className="h-56 w-56 text-pink-300" />
      </div>
      <ModalGeneric.Title className="mt-[0.875rem] w-full text-center text-[1.25rem] font-bold text-pink-300">
        {title}
      </ModalGeneric.Title>
      <ModalGeneric.Description className="mt-[0.625rem] w-full text-center text-16/[120%] text-gray-800">
        {description}
      </ModalGeneric.Description>
    </div>
    <ModalGeneric.Close asChild onClick={onClose}>
      <Button className="!bg-gray-200" label="Fechar" />
    </ModalGeneric.Close>
  </ModalGeneric.Content>
);

export { Root } from "./Generic";
