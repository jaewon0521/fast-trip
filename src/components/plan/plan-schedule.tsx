"use client";

import { useState } from "react";
import PlaceList from "../place/place-list";
import PlaceSearch from "./place-search";
import { PlaceResult } from "@/service/google/places-dto";
import SearchButton from "../ui/button/search-button";

interface PlanScheduleProps {
  day: number;
  title: string;
  defaultPlaces: PlaceResult[];
  selectedPlaces: PlaceResult[];
  onTogglePlace: (day: number, place: PlaceResult) => void;
}
export default function PlanSchedule({
  day,
  title,
  defaultPlaces,
  selectedPlaces,
  onTogglePlace,
}: PlanScheduleProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const togglePlaceSelect = (place: PlaceResult) => {
    onTogglePlace(day, place);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="divider">
        <span className="text-gray-600">{title}</span>
      </div>
      <div className="relative">
        <SearchButton title="검색" onClick={toggleSearch}>
          여행 장소를 검색 하세요.
        </SearchButton>
        {/* 검색 오버레이 */}
        {searchOpen && (
          <PlaceSearch
            selectPlace={selectedPlaces}
            defaultPlaces={defaultPlaces}
            onClose={toggleSearch}
            onSelectPlace={togglePlaceSelect}
          />
        )}
      </div>
      <PlaceList places={selectedPlaces} onDeletePlace={togglePlaceSelect} />
    </div>
  );
}
