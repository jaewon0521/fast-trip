"use server";

import { getPlan } from "@/action/plan/api";
import UserPlan from "@/components/user/plan";
import { ParsePlanDto } from "@/service/plan/dto";

const ServerUserPlan = async () => {
  const res = await getPlan();

  if (!res.success) {
    return <div>{res.errorMessage}</div>;
  }

  const parsePlace: ParsePlanDto[] = res.data.map((plan) => ({
    ...plan,
    places: JSON.parse(plan.places),
  }));

  return <UserPlan plans={parsePlace} />;
};

export default async function UserPlanPage() {
  return <ServerUserPlan />;
}
