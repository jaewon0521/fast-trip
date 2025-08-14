import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/trip-main.jpg"
          alt="Trip background"
          fill
          className="object-cover"
        />
      </div>
      <section className="fixed top-0 left-0 w-full z-[-1] h-screen flex items-center justify-center max-md:p-10">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold text-white mb-6 max-md:text-3xl max-md:mb-2">
            당신의 여행을 빠르게 계획하세요
          </h2>
          <p className="text-lg text-white font-semibold max-md:text-xs">
            AI 여행 경로 추천 서비스는 나만의 여행을 더욱 특별하게 만들어
            줍니다.
          </p>
          <div className="flex justify-center gap-8 mt-10 animate-fadeInDown">
            <Link
              href="/schedule/question"
              className="btn btn-lg border-none bg-blue-500 text-white rounded-xl px-10 font-semibold hover:bg-blue-600"
            >
              나만의 여행
            </Link>
            <Link
              href="/schedule/suggest"
              className="btn btn-lg border-none bg-[rgba(0,0,0,0.2)] text-white rounded-xl  px-10 font-semibold hover:bg-black/30"
            >
              AI 추천 여행
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
