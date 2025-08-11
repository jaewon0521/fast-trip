import { PlaceResult } from "@/service/google/places-dto";
import PlaceItem from "./place-item";

interface PlaceListProps {
  places: PlaceResult[];
  onDeletePlace: (place: PlaceResult) => void;
}

export default function PlaceList({ places, onDeletePlace }: PlaceListProps) {
  return (
    <ul className="space-y-4">
      {places.map((place, idx) => (
        <PlaceItem
          key={`${place.place_id}-${idx}`}
          place={place}
          number={places.indexOf(place) + 1}
          onDeletePlace={onDeletePlace}
        />
      ))}
    </ul>
  );
}
