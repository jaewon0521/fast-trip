import { ParsePlanDto } from "@/service/plan/dto";
import Responsive from "../responsive";
import PlanCardItem from "./plan-card-item";

interface UserPlanProps {
  plans: ParsePlanDto[];
}

export default function UserPlan({ plans }: UserPlanProps) {
  return (
    <Responsive>
      <div className="pt-24 pb-10 px-8">
        <div className="flex w-full mb-10">
          <h1 className="flex w-full items-center border-b-4 border-blue-500 pb-4 text-blue-500 gap-2">
            <span className="text-xl">나의 일정</span>
            <span className="text-xl font-bold">{plans.length}</span>
          </h1>
        </div>
        <div className="mb-7">
          <span className="text-2xl font-semibold">나의 여행 도시 목록</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {plans.map((plan, idx) => (
            <PlanCardItem key={`${plan.id}_${idx}`} plan={plan} />
          ))}
        </div>
      </div>
    </Responsive>
  );
}
