"use client";

import DateRangePicker from "../ui/date-range-picker";

interface PlanSidebarProps {
  places: any[];
}

export default function PlanSidebar({ places }: PlanSidebarProps) {
  return (
    <aside className="flex flex-col w-[375px] min-w-[375px] max-w-[375px] h-full border-r border-gray-200 bg-white shadow-md z-999 overflow-hidden overflow-y-auto">
      <header className="flex flex-col px-6 py-8 border-b border-gray-100 bg-gray-50">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">오사카 여행</h1>
        <DateRangePicker />
        <span className="text-sm text-gray-600 mt-2">2박 3일</span>
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

function PlaceList({ places }: { places: any[] }) {
  return (
    <ul className="space-y-4">
      {places.map((place) => (
        <PlaceItem key={place.place_id} place={place} />
      ))}
    </ul>
  );
}

function PlaceItem({ place }: { place: any }) {
  return (
    <li>
      <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
        <span className="font-medium text-blue-700">{place.name}</span>
      </section>
    </li>
  );
}
