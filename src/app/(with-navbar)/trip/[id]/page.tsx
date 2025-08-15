import { getPlanDetail } from "@/action/plan/api";
import TripViewer from "@/components/trip/trip-viewer";
import { MarkersByDay } from "@/components/trip/type";
import { httpClient } from "@/lib/fetch";
import { GeocodingResult } from "@/service/google/geocode-dto";
import { differenceInDays } from "date-fns";
import { Metadata } from "next";

interface PlanDetailParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PlanDetailParams>;
}): Promise<Metadata> {
  const { id } = await params;

  const plan = await getPlanDetail(id);

  if (!plan.success) {
    return {
      title: "Fast Trip",
      description: "Fast Trip",
    };
  }

  const daysCount = differenceInDays(
    new Date(plan.data.end_at),
    new Date(plan.data.start_at)
  );
  const daysText =
    daysCount === 0 ? "당일치기" : `${daysCount}박 ${daysCount + 1}일`;

  return {
    title: `Fast Trip - ${plan.data.region} 여행`,
    description: `Fast Trip - ${plan.data.region} 여행 ${daysText} 일정을 확인해 보세요.`,
    openGraph: {
      title: `Fast Trip - ${plan.data.region} 여행`,
      description: `Fast Trip - ${plan.data.region} 여행 ${daysText} 일정을 확인해 보세요.`,
      images: [{ url: "/images/trip-main.jpg" }],
    },
  };
}

const ServerUserPlanDetailPage = async ({ id }: PlanDetailParams) => {
  const plan = await getPlanDetail(id);

  if (!plan.success) {
    return <div>{plan.errorMessage}</div>;
  }

  const parsePlace: MarkersByDay = JSON.parse(plan.data.places);

  const geocodeData = await httpClient()
    .url(`/api/google/places/geocode?region=${plan.data.region}`)
    .next({ revalidate: 60 * 60 * 24 })
    .call<GeocodingResult>();

  return (
    <TripViewer
      markers={parsePlace}
      region={plan.data.region}
      location={geocodeData.geometry.location}
      startDate={plan.data.start_at}
      endDate={plan.data.end_at}
    />
  );
};

export default async function UserPlanDetailPage({
  params,
}: {
  params: Promise<PlanDetailParams>;
}) {
  const { id } = await params;

  return <ServerUserPlanDetailPage id={id} />;
}
