import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        default: "bg-[#C94F14] text-white hover:bg-[#B8420D]",
        dark: "bg-[#1A1714] text-white hover:bg-[#2D2620]",
        secondary: "bg-white text-[#1A1714] border border-[rgba(28,24,20,0.1)] hover:bg-[#F2EDE4]",
        ghost: "text-[#78716C] hover:bg-[rgba(28,24,20,0.05)] hover:text-[#1A1714]",
        outline: "border border-[rgba(28,24,20,0.1)] bg-transparent text-[#78716C] hover:bg-[rgba(28,24,20,0.04)]",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-[6px]",
        sm: "h-7 px-3 text-xs rounded-[4px]",
        lg: "h-10 px-5 text-[15px] rounded-[6px]",
        icon: "h-9 w-9 rounded-[6px]",
        "icon-sm": "h-7 w-7 rounded-[4px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
