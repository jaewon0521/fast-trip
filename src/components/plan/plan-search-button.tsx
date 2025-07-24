import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export default function PlanSearchButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full flex items-center justify-center gap-2 p-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 group cursor-pointer",
        className
      )}
      {...props}
    >
      <svg
        className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {children}
    </button>
  );
}
