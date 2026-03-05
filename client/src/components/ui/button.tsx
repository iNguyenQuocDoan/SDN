import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-main",
        outline: "btn-ghost",
        destructive: "btn-danger",
        ghost:
          "border-transparent bg-transparent hover:bg-[rgba(188,116,27,0.08)] hover:text-[var(--brand-strong)]",
        link: "text-[var(--brand-strong)] underline-offset-4 hover:underline",
      },
      size: {
        default: "rounded-xl px-4 py-2",
        sm: "rounded-lg px-3 py-1 text-xs",
        lg: "rounded-xl px-6 py-3",
        /** Pill shape — for client-side nav/action buttons */
        pill: "rounded-full px-4 py-2",
        icon: "h-10 w-10 rounded-full p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
