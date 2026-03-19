import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[6px] border border-[rgba(28,24,20,0.1)] bg-[#F5F2EC] px-3 py-2 text-sm text-[#1A1714] placeholder:text-[#A8A29E] transition-colors outline-none focus:border-[rgba(28,24,20,0.3)] focus:ring-2 focus:ring-[rgba(28,24,20,0.06)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
