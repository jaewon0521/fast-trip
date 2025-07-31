"use client";

import { useFunnel } from "@use-funnel/browser";
import { CityPlanStep, DaysPlanStep } from "../question/page";
import { useRouter } from "next/navigation";
import QuestionCity from "@/components/question/question-city";
import QuestionDays from "@/components/question/question-days";
import QuestionCompanion from "@/components/question/question-companion";
import QuestionTravelType from "@/components/question/question-travel-type";
import { ArrowLeftIcon } from "lucide-react";

type CompanionPlanStep = {
  region: string;
  startDate: string;
  endDate: string;
  who?: string;
};

type TravelTypePlanStep = {
  region: string;
  startDate: string;
  endDate: string;
  who: string;
  type?: string;
};

export default function SuggestPage() {
  const Funnel = useFunnel<{
    CityStep: CityPlanStep;
    DaysStep: DaysPlanStep;
    CompanionStep: CompanionPlanStep;
    TravelTypeStep: TravelTypePlanStep;
  }>({
    id: "plan-suggest",
    initial: {
      step: "CityStep",
      context: {},
    },
  });
  const router = useRouter();

  const stepCurrent = Funnel.index + 1;
  const stepTotal = 4;


  return (
    <Funnel.Render
      CityStep={({ history }) => (
        <QuestionCity
          onNext={(city: string) => history.push("DaysStep", { region: city })}
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
      DaysStep={({ context, history }) => (
        <QuestionDays
          onNext={(startDate, endDate) =>
            history.push("CompanionStep", {
              region: context.region,
              startDate,
              endDate,
            })
          }
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
      CompanionStep={({ context, history }) => (
        <QuestionCompanion
          onNext={(companion) =>
            history.push("TravelTypeStep", {
              region: context.region,
              startDate: context.startDate,
              endDate: context.endDate,
              who: companion,
            })
          }
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
      TravelTypeStep={({ context, history }) => (
        <QuestionTravelType
          onNext={(type) => router.push(``)}
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      )}
    />
  );
}
