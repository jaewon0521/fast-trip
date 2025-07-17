"use client";

import { PlaceResult } from "@/service/google/places-dto";
import PlaceList from "../place/place-list";

interface PlanSidebarProps {
  region: string;
  places: PlaceResult[];
}

export default function PlanSidebar({ region, places }: PlanSidebarProps) {
  return (
    <aside className="flex flex-col w-[375px] min-w-[375px] max-w-[375px] h-full border-r border-gray-200 bg-white shadow-md z-999 overflow-hidden overflow-y-auto">
      <header className="flex flex-col px-6 py-8 border-b border-gray-100 bg-gray-50">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          {region} 여행
        </h1>
      </header>
      <section className="px-6 py-4 border-b border-gray-100">
        <div className="text-sm text-gray-600">장소 선택</div>
      </section>
      <nav className="flex-1 px-4 py-2">
        <span>1일차</span>
        <PlaceList places={places} />
      </nav>
    </aside>
  );
}
