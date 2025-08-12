import { useGoogleMapValue } from "@/app/context/GoogleMapProvider";
import { cn } from "@/lib/utils";
import { PlaceResult } from "@/service/google/places-dto";
import { smoothPanTo } from "@/utils/map-event";
import { Trash2 } from "lucide-react";

interface PlaceItemProps {
  place: PlaceResult;
  number: number;
  onDeletePlace?: (place: PlaceResult) => void;
}

export default function PlaceItem({
  place,
  number,
  onDeletePlace,
}: PlaceItemProps) {
  const map = useGoogleMapValue();
  const firstType = place.types?.[0];
  const typeLabel = firstType === "restaurant" ? "음식점" : "명소";

  const handleClickPlace = () => {
    if (!map) return;

    smoothPanTo(map, place.geometry.location);
  };

  return (
    <li className="flex items-center">
      <div className="flex flex-col items-center mr-4">
        <div className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
          {number}
        </div>
      </div>

      {/* 장소 정보 영역 */}
      <section
        className="w-[calc(100%-50px)] flex justify-between rounded-lg bg-white px-4 py-3 shadow-sm flex-1 cursor-pointer"
        onClick={handleClickPlace}
      >
        <div className="w-[calc(100%-50px)] flex flex-col gap-1">
          <span
            className="text-sm font-bold word-break-keep-all truncate"
            title={place.name}
          >
            {place.name}
          </span>
          <span
            className="block max-w-full text-xs text-gray-500 word-break-keep-all truncate"
            title={place.formatted_address}
          >
            {place.formatted_address}
          </span>
          <span
            className={cn(
              "text-xs",
              firstType === "restaurant" ? "text-pink-500" : "text-blue-500"
            )}
          >
            {typeLabel}
          </span>
        </div>
        <div>
          {onDeletePlace && (
            <button
              className="btn btn-sm btn-outline btn-circle btn-error h-full border-none rounded-md hover:bg-accent-focus"
              onClick={() => onDeletePlace(place)}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </section>
    </li>
  );
}
