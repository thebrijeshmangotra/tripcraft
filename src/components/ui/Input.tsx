import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, value, label, ...props }, ref) => {
    const inputType = type === "number" ? "text" : type;

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number") {
        const inputValue = event.target.value;
        // Allow empty string, digits, and single decimal point
        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
          const modifiedEvent = {
            ...event,
            target: { ...event.target, value: inputValue },
          };
          onChange(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
        }
        // If regex fails, don't call onChange (prevents invalid input)
      } else {
        onChange(event);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          type={inputType}
          value={value}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          onChange={onChangeHandler}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
