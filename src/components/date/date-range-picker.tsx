"use client";

import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  DayPicker,
  DayPickerProps,
  getDefaultClassNames,
  PropsRange,
} from "react-day-picker";
import "react-day-picker/style.css";

type DateRangePickerProps = DayPickerProps & PropsRange;

export default function DateRangePicker({
  ...props
}: Omit<DateRangePickerProps, "mode">) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      mode="range"
      locale={ko}
      navLayout="around"
      animate
      classNames={{
        day_button: `${defaultClassNames.day_button} !border-none `,
        day: `${defaultClassNames.day} p-2 font-semibold max-md:p-1 max-sm:p-0`,
        range_start: `bg-brand-500 !rounded-tl-3xl !rounded-bl-3xl`,
        range_end: `bg-brand-500 !rounded-tr-3xl !rounded-br-3xl`,
        selected: `${defaultClassNames.selected} !bg-brand-500 !text-white`,
        month_caption: `${defaultClassNames.month_caption} !flex !items-start !text-gray-500`,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }) => (
          <button
            className={cn(
              className,
              "!w-[30px] !h-[30px] !border-1 !border-solid !border-gray-300 !rounded-md"
            )}
            {...props}
          >
            <ChevronLeftIcon className="h-4 w-4 stroke-2" />
          </button>
        ),
        NextMonthButton: ({ className, ...props }) => (
          <button
            className={cn(
              className,
              "!w-[30px] !h-[30px] !border-1 !border-solid !border-gray-300 !rounded-md"
            )}
            {...props}
          >
            <ChevronRightIcon className="h-4 w-4 stroke-2" />
          </button>
        ),
      }}
      {...props}
    />
  );
}
