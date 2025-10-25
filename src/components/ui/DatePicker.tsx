import { useCallback, useEffect, useState } from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
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
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (value) {
      setDate(dayjs(value).toDate());
    }
  }, [value]);

  const handleChange = useCallback(() => {
    onChange(dayjs(date).format("YYYY-MM-DD").toString());
  }, [date]);

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
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              handleChange();
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
