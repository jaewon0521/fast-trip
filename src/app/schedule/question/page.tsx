"use client";

import QuestionCity from "@/components/question/question-city";
import QuestionDays from "@/components/question/question-days";
import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";

export type CityPlanStep = {
  region?: string;
};

export type DaysPlanStep = {
  region: string;
  startDate?: string;
  endDate?: string;
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

  const stepCurrent = Funnel.index + 1;
  const stepTotal = 2;

  return (
    <Funnel.Render
      CityStep={({ history }) => (
        <QuestionCity
          onNext={(city: string) => history.push("DaysStep", { region: city })}
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
      DaysStep={({ context }) => (
        <QuestionDays
          onNext={(startDate, endDate) =>
            router.push(
              `/plan?region=${context.region}&startDate=${startDate}&endDate=${endDate}`
            )
          }
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
    />
  );
}
