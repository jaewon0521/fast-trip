"use client";


interface PlanSidebarProps {
  children: React.ReactNode;
}

export default function PlanSidebar({ children }: PlanSidebarProps) {
  return <div className="flex flex-col px-4">{children}</div>;
}
