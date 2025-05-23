import * as React from "react";

import { cn } from "@/core/app/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onClickEndButton?: () => void;
  onClickStartButton?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, onClickEndButton, onClickStartButton, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    const handleStartIconClick = () => {
      if (startIcon) {
        onClickStartButton?.()
      }
    }

    const handleEndIconClick = () => {
      if (endIcon) {
        onClickEndButton?.()
      }
    }

    return (
      <div className="w-full relative">
        {StartIcon && (
          <div className={
            cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2",
              onClickStartButton ? "cursor-pointer" : ""
            )
          } onClick={handleStartIconClick}>
            <StartIcon size={20} className={
              cn(
                "text-muted-foreground",
                onClickStartButton ? "cursor-pointer transition-all duration-300 hover:text-primary" : ""
              )
            } />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border-input border-0 bg-muted px-6 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-10" : "",
            endIcon ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className={
            cn(
              "absolute right-4 top-1/2 transform -translate-y-1/2",
              onClickEndButton ? "cursor-pointer" : ""
            )
          } onClick={handleEndIconClick}>
            <EndIcon className={
              cn(
                "text-muted-foreground",
                onClickEndButton ? "cursor-pointer transition-all duration-300 hover:text-primary" : ""
              )
            } size={20} />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };