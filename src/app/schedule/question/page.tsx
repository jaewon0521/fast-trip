"use client";

import QuestionCity from "@/components/question/question-city";
import QuestionDays from "@/components/question/question-days";
import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";

type CityPlanStep = {
  region?: string;
};

export type DaysPlanStep = {
  region: string;
  startDate?: string;
  endDate?: string;
};

type CompanionPlanStep = {
  region: string;
  startDate: string;
  endDate: string;
  who: string;
};

type TravelTypePlanStep = {
  region: string;
  startDate: string;
  endDate: string;
  who: string;
  type?: string;
};

export default function QuestionPage() {
  const Funnel = useFunnel<{
    CityStep: CityPlanStep;
    DaysStep: DaysPlanStep;
  }>({
    id: "plan-question",
    initial: {
      step: "CityStep",
      context: {},
    },
  });
  const router = useRouter();

  return (
    <Funnel.Render
      CityStep={({ history }) => (
        <QuestionCity
          onNext={(city: string) => history.push("DaysStep", { region: city })}
        />
      )}
      DaysStep={({ context }) => (
        <QuestionDays
          onNext={(startDate, endDate) =>
            router.push(
              `/plan?region=${context.region}&startDate=${startDate}&endDate=${endDate}`
            )
          }
        />
      )}
    />
  );
}
