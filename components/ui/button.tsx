import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium outline-none transition-[background-color,color,box-shadow,transform] duration-300 ease-(--ease-out-expo) focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-foreground",
        secondary: "text-foreground ring-1 ring-inset ring-foreground/15 hover:bg-sand hover:ring-foreground/30",
        /** On photos and deep-sea blocks */
        light: "bg-background text-foreground hover:bg-sand",
        outlineLight: "text-background ring-1 ring-inset ring-background/35 hover:bg-background/10 hover:ring-background/70",
      },
      size: {
        md: "h-11 px-5 text-[15px] [&_svg]:size-[1.1em]",
        lg: "h-13 px-7 text-base [&_svg]:size-[1.1em]",
      },
      /** Navigational CTAs carry a trailing arrow chip */
      arrow: { true: "gap-3", false: "" },
    },
    compoundVariants: [
      { arrow: true, size: "md", className: "pl-5 pr-1.5" },
      { arrow: true, size: "lg", className: "pl-6 pr-2" },
    ],
    defaultVariants: { variant: "primary", size: "md", arrow: false },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, arrow, asChild = false, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, arrow, className }))} {...props}>
      <Slottable>{children}</Slottable>
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center rounded-full bg-current/15 transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5",
            size === "lg" ? "size-9" : "size-8",
          )}
        >
          <ArrowRight className="size-4!" strokeWidth={1.75} />
        </span>
      ) : null}
    </Comp>
  );
}

export { Button };
