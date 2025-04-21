import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/app/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-bold text-md shadow-[0px_4px_0px_0px] hover:-translate-y-1 hover:shadow-[0px_6px_0px_0px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "border-none hover:text-primary/90 shadow-none bg-transparent text-primary",
      },
      color: {
        primary: "bg-primary text-primary-foreground shadow-(color:--color-primary)/30 hover:bg-primary/90",
        secondary: "bg-secondary text-background shadow-(color:--color-secondary)/30 hover:bg-secondary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-(color:--color-destructive)/30 hover:bg-destructive/90 text-primary-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      color: "primary",
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "primary",
        className: "bg-transparent border-primary/30 hover:bg-primary/10 text-primary/30",
      },
      {
        variant: "link",
        color: "primary",
        className: "text-primary/30 hover:text-primary/90 shadow-none bg-transparent hover:shadow-none hover:underline hover:bg-transparent hover:translate-y-0 hover:cursor-pointer",
      },
    ],
  }
)

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
