import React, { Suspense } from "react";

import { httpClient } from "@/lib/fetch";
import { extractError } from "@/lib/error";
import { PlaceTextSearchResponse } from "@/service/google/places-dto";
import { GeocodingResult } from "@/service/google/geocode-dto";
import TripPlanner from "@/components/plan/trip-planner";

interface PlanPageProps {
  region: string;
}

async function PlaceList({ region }: PlanPageProps) {
  try {
    const geocodeData = await httpClient()
      .url(`/api/google/places/geocode?region=${region}`)
      .next({ revalidate: 60 * 60 * 24 })
      .call<GeocodingResult>();

    const location = geocodeData.geometry.location;

    const placesData = await httpClient()
      .url(
        `/api/google/places/search?region=${region}&lat=${location.lat}&lng=${location.lng}`
      )
      .next({ revalidate: 60 * 60 * 24 })
      .call<PlaceTextSearchResponse>();

    return (
      <TripPlanner
        region={region}
        places={placesData.results}
        location={geocodeData.geometry.location}
      />
    );
  } catch (e) {
    const error = extractError(e);

    return <div>{error.message}</div>;
  }
}

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ region: string }>;
}) {
  const param = await searchParams;

  return (
    <div className="flex h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <PlaceList {...param} />
      </Suspense>
    </div>
  );
}
