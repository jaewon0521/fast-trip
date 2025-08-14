import FeatureDescriptionSection from "@/components/portfolio/feature-description-section";
import { TechBadgeGroup } from "@/components/portfolio/tech-badge-group";
import Responsive from "@/components/responsive";
import Image from "next/image";

export default function Portfolio() {
  return (
    <Responsive className="max-w-[800px] h-screen pt-2">
      <div className="pb-10 px-5">
        <section className="flex flex-col bg-blue-400 px-10 py-5 mb-10 rounded-lg bg-gradient-to-t from-[#00000040] to-[rgb(0_0_0_/_0)]">
          <div className="flex gap-2 mb-3">
            <Image
              alt="Fast Trip"
              src="/images/fast-trip.png"
              width={35}
              height={35}
              className="bg-white rounded-lg"
            />
            <div className="text-white text-3xl font-extrabold">Fast Trip</div>
          </div>
          <p className="mb-3">
            <span className="text-white text-lg font-bold ">
              당신의 여행을 빠르게 계획하세요.
            </span>
          </p>
          <p className="mb-3">
            <span className="text-white text-md font-bold">
              AI 여행 계획 추천, 나만의 여행 계획으로 여행을 즐겨보세요.
            </span>
          </p>
          <p>
            <span className="text-white text-sm font-semibold">
              2025.07~2025.08
            </span>
          </p>
          <div className="flex gap-2 mt-3">
            <button className="btn btn-sm bg-blue-400 border-none text-white hover:bg-blue-500">
              둘러보기
            </button>
            <button className="btn btn-neutral btn-sm">Git</button>
          </div>
        </section>
        <section className="flex flex-col gap-10">
          <article className="bg-white p-5 rounded-lg shadow-md border-1 border-gray-200 rounded-lg">
            <h1 className="text-2xl font-bold border-b-1 border-gray-200 pb-5">
              기술 스택
            </h1>
            <TechBadgeGroup
              title="Front End"
              badges={[
                { name: "Next.js", src: "/images/next.svg" },
                { name: "React", src: "/images/react.svg" },
                { name: "Tailwind Css", src: "/images/tailwind.svg" },
                { name: "Typescript", src: "/images/typescript.svg" },
              ]}
            />
            <TechBadgeGroup
              title="Back End"
              badges={[
                { name: "Next API Route", src: "/images/next.svg" },
                { name: "Supabase", src: "/images/supabase.svg" },
                { name: "Supabase Auth", src: "/images/supabase.svg" },
              ]}
            />
            <TechBadgeGroup
              title="API"
              badges={[
                { name: "Google Maps API", src: "/images/google.svg" },
                { name: "Google Places API", src: "/images/google.svg" },
                { name: "Google Geocoding API", src: "/images/google.svg" },
                { name: "Google Generative API", src: "/images/google.svg" },
              ]}
            />
            <TechBadgeGroup
              title="Deployment"
              badges={[{ name: "Vercel", src: "/images/vercel.svg" }]}
            />
          </article>
          <article className="bg-white p-5 rounded-lg shadow-md border-1 border-gray-200 rounded-lg">
            <h1 className="text-2xl font-bold border-b-1 border-gray-200 pb-5">
              기능
            </h1>
            <div className="flex flex-col gap-20 py-5">
              <FeatureDescriptionSection
                title="간편 로그인"
                description="Kakao Oauth API 간편 로그인"
                images={["/images/login.png"]}
              />
              <FeatureDescriptionSection
                title="여행 계획 작성"
                description="도시, 일정 선택 후 장소 검색"
                images={[
                  "/images/my-plan-1.png",
                  "/images/my-plan-2.png",
                  "/images/my-plan-3.png",
                  "/images/my-plan-4.png",
                ]}
              />

              <FeatureDescriptionSection
                title="AI 여행 계획 추천"
                description="Gemini API를 활용한 여행 계획 추천"
                images={[
                  "/images/ai-plan-1.png",
                  "/images/ai-plan-2.png",
                  "/images/ai-plan-3.png",
                  "/images/ai-plan-4.png",
                  "/images/ai-plan-5.png",
                ]}
              />
            </div>
          </article>
        </section>
      </div>
    </Responsive>
  );
}
