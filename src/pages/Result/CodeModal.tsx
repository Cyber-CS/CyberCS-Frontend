import { Button } from "~/components";
import { ModalGeneric } from "~/components/Dialog";

type CodeModalProps = {
  onClose: () => void;
  open: boolean;
};

export const CodeModal = ({ onClose, open }: CodeModalProps) => {
  return (
    <ModalGeneric.Root open={open}>
      <ModalGeneric.Content>
        <ModalGeneric.Title>Modal Title</ModalGeneric.Title>
        <ModalGeneric.Description>Modal Description</ModalGeneric.Description>
        <ModalGeneric.Close>
          <Button label="Close Modal" />
        </ModalGeneric.Close>
      </ModalGeneric.Content>
    </ModalGeneric.Root>
  );
};
