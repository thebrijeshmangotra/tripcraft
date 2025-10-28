import { useCallback, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

function DatePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const date = value ? dayjs(value).toDate() : undefined;

  const handleChange = useCallback((selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange(dayjs(selectedDate).format("YYYY-MM-DD"));
      setOpen(false);
    }
  }, [onChange]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label || "Date"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal px-3"
          >
            {value || "Select date"}
            <CalendarIcon className="" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
