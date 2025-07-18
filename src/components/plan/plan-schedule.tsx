import { useState } from "react";
import PlaceList from "../place/place-list";
import PlaceSearch from "./place-search";
import { PlaceResult } from "@/service/google/places-dto";
import SearchButton from "../ui/button/search-button";

interface PlanScheduleProps {
  day: number;
  title: string;
  defaultPlaces: PlaceResult[];
}
export default function PlanSchedule({
  day,
  title,
  defaultPlaces,
}: PlanScheduleProps) {
  const [selectPlace, setSelectPlace] = useState<PlaceResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSelectPlace = (place: PlaceResult) => {
    // 중복인 place가 들어오면 제거
    if (selectPlace.some((p) => p.place_id === place.place_id)) {
      setSelectPlace((prev) =>
        prev.filter((p) => p.place_id !== place.place_id)
      );
    } else {
      setSelectPlace((prev) => [...prev, place]);
    }
  };

  const handleDeletePlace = (place: PlaceResult) => {
    setSelectPlace((prev) => prev.filter((p) => p.place_id !== place.place_id));
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
            selectPlace={selectPlace}
            defaultPlaces={defaultPlaces}
            onClose={toggleSearch}
            onSelectPlace={handleSelectPlace}
          />
        )}
      </div>
      <PlaceList places={selectPlace} onDeletePlace={handleDeletePlace} />
    </div>
  );
}
