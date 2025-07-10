import { FeatureGrid } from "@/components/grid";
import { getUser } from "@/utils/auth";

export default async function Home() {
  const user = await getUser();

  const basicFeatures = [
    {
      title: "🚀 빠른 시작",
      description: "카카오 계정으로 간편하게 시작하세요",
    },
    {
      title: "💾 자동 저장",
      description: "모든 여행 계획이 자동으로 저장됩니다",
    },
    {
      title: "🔒 안전한 보관",
      description: "개인정보가 안전하게 보호됩니다",
    },
  ];

  const userFeatures = [
    {
      title: "✈️ 여행 계획",
      description: "AI와 함께 완벽한 여행 일정을 만들어보세요",
    },
    {
      title: "🗺️ 여행지 추천",
      description: "개인 맞춤형 여행지를 추천받아보세요",
    },
    {
      title: "📱 모바일 최적화",
      description: "언제 어디서나 여행 계획을 확인하세요",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
      <section className="text-center max-w-[900px]">
        <h1 className="text-5xl font-extrabold bg-gradient-to-tr from-blue-500 to-violet-500 bg-clip-text text-transparent mb-8 leading-tight animate-pulse">
          Fast Trip에 오신 것을 환영합니다!
        </h1>
        {user ? (
          <div>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              {user.user_metadata.name}님, 즐거운 여행 계획을 세워보세요!
            </p>
            <FeatureGrid features={userFeatures} />
          </div>
        ) : (
          <div>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">로그인하여 나만의 여행 계획을 시작해보세요!</p>
            <FeatureGrid features={basicFeatures} />
          </div>
        )}
      </section>
    </div>
  );
}
