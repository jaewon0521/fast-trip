import { PlaceResult } from "@/service/google/places-dto";

export default function PlaceItem({ place }: { place: PlaceResult }) {
  return (
    <li>
      <section className="flex flex-col rounded-lg bg-white px-4 py-3 shadow-sm">
        <span className="font-medium text-blue-700">{place.name}</span>
        <span
          className="word-break-keep-all truncate max-w-full block"
          title={place.formatted_address}
        >
          {place.formatted_address}
        </span>
        <span>{place.rating}</span>
        <span>{place.user_ratings_total}</span>
        <span> {place.types[0] === "restaurant" ? "음식점" : "명소"}</span>
      </section>
    </li>
  );
}
