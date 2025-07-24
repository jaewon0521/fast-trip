import React, { Suspense } from "react";

import { httpClient } from "@/lib/fetch";
import { extractError } from "@/lib/error";
import { PlaceTextSearchResponse } from "@/service/google/places-dto";
import { GeocodingResult } from "@/service/google/geocode-dto";
import TripPlanner from "@/components/plan/trip-planner";

interface PlanPageSearchParams {
  region: string;
  startDate: string;
  endDate: string;
}

async function ServerTipPlan({
  region,
  startDate,
  endDate,
}: PlanPageSearchParams) {
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
        startDate={startDate}
        endDate={endDate}
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
  searchParams: Promise<PlanPageSearchParams>;
}) {
  const param = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerTipPlan {...param} />
    </Suspense>
  );
}
