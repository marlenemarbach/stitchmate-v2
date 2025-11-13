import {
  Modal,
  ModalContainer,
  ModalOverlay,
  ModalTrigger,
  ModalTriggerProps,
} from "./Modal";

export function Alert({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <Modal>
      <ModalOverlay />
      <ModalContainer className={className}>{children}</ModalContainer>
    </Modal>
  );
}

type AlertTriggerProps = ModalTriggerProps;

export function AlertTrigger({ children, ...props }) {
  return <ModalTrigger>{children}</ModalTrigger>;
}
