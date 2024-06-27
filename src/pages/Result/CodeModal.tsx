import { X } from "@phosphor-icons/react";
import { ModalGeneric } from "~/components/Dialog";

type CodeModalProps = {
  fileName: string;
  code: string;
};

export const CodeModal = ({ fileName, code }: CodeModalProps) => {
  const lines = code.split("\n");
  return (
    <ModalGeneric.Content>
      <div className="flex items-center justify-between">
        <p>Arquivo encontrado</p>
        <ModalGeneric.Close>
          <button>
            <X size={24} />
          </button>
        </ModalGeneric.Close>
      </div>
      <ModalGeneric.Title>{fileName}</ModalGeneric.Title>
      <ModalGeneric.Description className="overflow-auto h-360 w-full xl:min-w-[1280px] max-w-[1280px] bg-gray-150/20  rounded-4">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="flex gap-8 ">
              <span className="font-mono text-14 text-gray-200 border-r border-white min-w-48 text-right pr-8 bg-blue-100">{index + 1}</span>
              <span className="font-mono text-14">{line}</span>
            </div>
          ))}
        </code>
      </ModalGeneric.Description>
    </ModalGeneric.Content>
  );
};
