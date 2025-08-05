"use server";

import { getPlan } from "@/action/plan/api";
import { MarkersByDay } from "@/components/plan/trip-planner";
import UserPlan from "@/components/user/plan";
import { extractError } from "@/lib/error";
import { ParsePlanDto } from "@/service/plan/dto";

const ServerUserPlan = async () => {
  try {
    const res = await getPlan();

    const parsePlace: ParsePlanDto[] = res.map((plan) => ({
      ...plan,
      places: JSON.parse(plan.places),
    }));

    return <UserPlan plans={parsePlace} />;
  } catch (e) {
    const error = extractError(e);

    return <div>{error.message}</div>;
  }
};

export default async function UserPlanPage() {
  return <ServerUserPlan />;
}
