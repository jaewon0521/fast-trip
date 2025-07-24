import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const DAY_ACCENT_COLOR_LENGTH = 5;

const DayButtonVariants = cva(
  "min-w-[70px] px-3 py-1 text-sm rounded-full transition-colors duration-200",
  {
    variants: {
      dayIndex: {
        0: "bg-gray-100 text-gray-600",
        1: "bg-day-accent-100",
        2: "bg-day-accent-200",
        3: "bg-day-accent-300",
        4: "bg-day-accent-400",
        5: "bg-day-accent-500",
      },
      isSelected: {
        true: "text-white",
        false: "bg-gray-100 text-gray-600",
      },
    },
    compoundVariants: [
      {
        isSelected: true,
        dayIndex: 0,
        className: "bg-gray-800 text-white",
      },
    ],
    defaultVariants: {
      isSelected: false,
      dayIndex: 1, // 기본값 설정 (필요한 경우)
    },
  }
);

interface PlaceDayButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof DayButtonVariants> {
  dayNumber: number;
}

export default function PlaceDayButton({
  dayNumber,
  className,
  isSelected,
  children,
  ...props
}: PlaceDayButtonProps) {
  const actualDayIndex = (((dayNumber - 1) % DAY_ACCENT_COLOR_LENGTH) +
    1) as VariantProps<typeof DayButtonVariants>["dayIndex"];

  return (
    <button
      className={cn(
        DayButtonVariants({
          isSelected,
          dayIndex: actualDayIndex,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
