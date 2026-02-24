import { VariantProps } from "class-variance-authority";
import { toast as sonnerToast } from "sonner";
import { Button, buttonVariants } from "./Button";

type ToastProps = {
  id: string | number;
  description: string;
  title?: string;
  duration?: number;
  buttons?: ToastButtonProps[];
  dismissFn: () => void;
};

type ToastButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
};

export function customToast(toast: Omit<ToastProps, "dismissFn">) {
  return sonnerToast.custom(
    () => (
      <Toast
        id={toast.id}
        title={toast.title}
        description={toast.description}
        buttons={toast.buttons}
        dismissFn={() => sonnerToast.dismiss(toast.id)}
      />
    ),
    { duration: toast.duration, id: toast.id },
  );
}

function Toast({ description, title, buttons, dismissFn }: ToastProps) {
  return (
    <div className="grid w-[22.25rem] gap-2 rounded-2xl border border-border bg-popup p-4 drop-shadow-lg">
      {title && <h4>{title}</h4>}
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-2 flex items-center justify-end gap-3">
        {buttons?.map((button, index) => {
          return (
            <Button
              key={index}
              className={button.className}
              variant={button.variant}
              size={button.size}
              onClick={() => {
                button.onClick?.();
                dismissFn();
              }}
            >
              {button.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
