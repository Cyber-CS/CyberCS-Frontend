import type { DialogContentProps } from "@radix-ui/react-dialog"
import * as Dialog from "@radix-ui/react-dialog"
import { cx } from "class-variance-authority"

type ContentProps = DialogContentProps
export const Content = ({ className, children, ...props }: ContentProps) => (
  <Dialog.Portal>
    <Dialog.Overlay
      className={cx([
        "fixed inset-0 z-50",
        "bg-black/70 backdrop-blur-[1px]",
        "data-[state=closed]:animate-popOut",
      ])}
    />
    <Dialog.Content
      className={cx([
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "z-[100] bg-white p-32 rounded-12",
        "data-[state=open]:animate-popIn",
        className,
      ])}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
)

export {
  Close,
  Description,
  Root,
  Title,
  Trigger,
  type DialogContentProps,
} from "@radix-ui/react-dialog"
