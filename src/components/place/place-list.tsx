import { PlaceResult } from "@/service/google/places-dto";
import PlaceItem from "./place-item";

export default function PlaceList({ places }: { places: PlaceResult[] }) {
    return (
      <ul className="space-y-4">
        {places.map((place) => (
          <PlaceItem key={place.place_id} place={place} />
        ))}
      </ul>
    );
  }
  