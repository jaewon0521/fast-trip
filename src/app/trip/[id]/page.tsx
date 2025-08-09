import { getPlanDetail } from "@/action/plan/api";
import TripViewer from "@/components/trip/trip-viewer";
import { MarkersByDay } from "@/components/trip/type";
import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { GeocodingResult } from "@/service/google/geocode-dto";

interface PlanDetailParams {
  id: string;
}

const ServerUserPlanDetailPage = async ({ id }: PlanDetailParams) => {
  try {
    const plan = await getPlanDetail(id);

    const parsePlace: MarkersByDay = JSON.parse(plan.places);

    const geocodeData = await httpClient()
      .url(`/api/google/places/geocode?region=${plan.region}`)
      .next({ revalidate: 60 * 60 * 24 })
      .call<GeocodingResult>();

    return (
      <TripViewer
        markers={parsePlace}
        region={plan.region}
        location={geocodeData.geometry.location}
        startDate={plan.start_at}
        endDate={plan.end_at}
      />
    );
  } catch (e) {
    const error = extractError(e);

    return <div>{error.message}</div>;
  }
};

export default async function UserPlanDetailPage({
  params,
}: {
  params: Promise<PlanDetailParams>;
}) {
  const { id } = await params;

  return <ServerUserPlanDetailPage id={id} />;
}
