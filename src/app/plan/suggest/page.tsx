import TripEditor from "@/components/trip/trip-editor";
import { MarkersByDay } from "@/components/trip/type";
import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { GeocodingResult } from "@/service/google/geocode-dto";
import { PlaceResult } from "@/service/google/places-dto";

interface SuggestPagesSearchParams {
  region: string;
  startDate: string;
  endDate: string;
  who: string;
  type: string;
}

async function ServerSuggestTripPlan({
  region,
  startDate,
  endDate,
  who,
  type,
}: SuggestPagesSearchParams) {
  try {
    const geocodeData = await httpClient()
      .url(`/api/google/places/geocode?region=${region}`)
      .next({ revalidate: 60 * 60 * 24 })
      .call<GeocodingResult>();

    const location = geocodeData.geometry.location;

    const suggestPlace = await httpClient()
      .url("/api/google/gemini/suggest")
      .method("POST")
      .body({
        region,
        startDate,
        endDate,
        who,
        type,
      })
      .next({ revalidate: 60 * 60 * 24 })
      .call<(PlaceResult & { day: number })[]>();

    const markers = suggestPlace.reduce((acc, place) => {
      acc[place.day - 1] = [...(acc[place.day - 1] || []), place];
      return acc;
    }, {} as MarkersByDay);

    return (
      <TripEditor
        defaultMarkers={markers}
        region={region}
        location={location}
        startDate={startDate}
        endDate={endDate}
      />
    );
  } catch (e) {
    const error = extractError(e);

    return <div>{error.message}</div>;
  }
}

export default async function SuggestPage({
  searchParams,
}: {
  searchParams: Promise<SuggestPagesSearchParams>;
}) {
  const param = await searchParams;
  return <ServerSuggestTripPlan {...param} />;
}
