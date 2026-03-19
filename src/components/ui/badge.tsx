import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[rgba(201,79,20,0.1)] text-[#C94F14]",
        dark: "bg-[#1A1714] text-white",
        secondary: "bg-[rgba(28,24,20,0.06)] text-[#78716C]",
        outline: "border border-[rgba(28,24,20,0.1)] text-[#78716C]",
        pro: "bg-[rgba(201,79,20,0.1)] text-[#C94F14]",
        soon: "bg-[rgba(28,24,20,0.06)] text-[#A8A29E]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
