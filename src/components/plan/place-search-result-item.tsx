import { cn } from "@/lib/utils";
import { PlaceResult } from "@/service/google/places-dto";
import clsx from "clsx";
import { Check, Heart, Star } from "lucide-react";

interface PlaceSearchResultItemProps {
  place: PlaceResult;
  selectedPlace?: PlaceResult;
}

export default function PlaceSearchResultItem({
  selectedPlace,
  place,
}: PlaceSearchResultItemProps) {
  return (
    <div className="w-full flex justify-between">
      <div className="w-[calc(100%-50px)] flex flex-col gap-1">
        <span className="text-sm font-medium">{place.name}</span>
        <span className="text-xs text-gray-500 truncate break-keep">
          {place.formatted_address}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs text-gray-500",
              place.types[0] === "restaurant"
                ? "text-pink-500"
                : "text-blue-500"
            )}
          >
            {place.types[0] === "restaurant" ? "음식점" : "명소"}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500" fill="currentColor" />
            <span className="text-xs text-gray-500">{place.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-pink-500" fill="currentColor" />
            <span className="text-xs text-gray-500">
              ({place.user_ratings_total})
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className={clsx(
            "btn btn-sm btn-circle h-full rounded-md hover:bg-accent-focus text-white",
            selectedPlace ? "btn-accent" : "bg-gray-400"
          )}
        >
          <Check size={16} />
        </button>
      </div>
    </div>
  );
}
