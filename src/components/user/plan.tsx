import { ParsePlanDto } from "@/service/plan/dto";
import Responsive from "../responsive";
import Image from "next/image";
import DeletePlan from "./delete-plan";

interface UserPlanProps {
  plans: ParsePlanDto[];
}

const thumbnailImage = {
  도쿄: "/images/thumbnail/tokyo_thumbnail.jpg",
  오사카: "/images/thumbnail/osaka_thumbnail.jpg",
  후쿠오카: "/images/thumbnail/fukuoka_thumbnail.jpg",
};

export default function UserPlan({ plans }: UserPlanProps) {
  return (
    <Responsive>
      <div className="pt-24 pb-10 px-8">
        <div className="flex w-full mb-10">
          <div className="flex w-full border-b-4 border-blue-500 pb-4 text-2xl text-blue-500 gap-2">
            <span>나의 일정</span>
            <span className="font-bold">{plans.length}</span>
          </div>
        </div>
        <div>나의 여행 도시 목록</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {plans.map((plan, idx) => (
            <div
              key={`${plan.id}_${idx}`}
              className="relative h-[250px] border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="w-full h-full cursor-pointer">
                <div className="">
                  <Image
                    src={
                      thumbnailImage[plan.region as keyof typeof thumbnailImage]
                    }
                    alt={plan.region}
                    width={250}
                    height={250}
                    style={{
                      position: "absolute",
                      display: "block",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="group absolute w-full h-full transition-all duration-300 hover:bg-black/50">
                  <div className="flex flex-col h-full justify-center items-center">
                    <div className="flex flex-col items-center gap-1 text-white font-bold text-xl">
                      {plan.region}
                      <div className="flex gap-1 text-gray-400 font-bold text-sm">
                        <span>{plan.start_at}</span>
                        <span>-</span>
                        <span>{plan.end_at}</span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-4">
                      <div className="hidden text-red-400 cursor-pointer hover:text-red-500 transition-all duration-300 active:scale-110 group-hover:block ">
                        <DeletePlan id={plan.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Responsive>
  );
}
