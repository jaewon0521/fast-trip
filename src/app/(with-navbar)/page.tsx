import { FeatureGrid } from "@/components/grid";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const features = [
    {
      title: "✈️ 여행 계획",
      description: "AI와 함께 완벽한 여행 일정을 만들어보세요",
    },
    {
      title: "🔍 여행 경로 추천",
      description: "개인 맞춤형 여행지를 추천받아보세요",
    },
    {
      title: "💬 여행 경로 공유",
      description: "여행 경로를 공유해 친구와 함께 여행을 계획해보세요",
    },
    {
      title: "📝 여행 계획 정리",
      description: "여행 계획을 정리하고 공유해보세요",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center pt-36 px-8">
      <div className="flex flex-col gap-30 max-w-[900px]">
        <section className="flex flex-col items-center">
          <h2 className="text-5xl font-extrabold bg-gradient-to-tr from-blue-500 to-violet-500 bg-clip-text text-transparent mb-4 leading-tight animate-pulse">
            당신의 여행을 빠르게 계획하세요!
          </h2>
          <p className="text-gray-500">AI 여행 경로 추천 서비스는 나만의 여행을 더욱 특별하게 만들어 줍니다.</p>
          <div className="mt-5">
            <Button variant="brand" size="lg">
              시작하기
            </Button>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="text-5xl font-extrabold bg-gradient-to-tr from-blue-500 to-violet-500 bg-clip-text text-transparent mb-4 leading-tight animate-pulse text-center">
            FAST TRIP 주요 기능 소개
          </h2>
          <p className="text-gray-500">당신의 여행을 더욱 특별하게 만들어 줄 AI 기반 경로 추천 서비스를 만나보세요.</p>
          <FeatureGrid features={features} />
        </section>
      </div>
    </div>
  );
}
