"use client";

import { Button } from "@/components/ui/button";
import { QuestionSection } from "@/components/question/question-section";
import { useState } from "react";
import Link from "next/link";

export default function QuestionPage() {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const handleContentSelect = (city: string) => {
    setSelectedContent(city);
    setDisabled(false);
  };

  return (
    <div className="max-w-[1200px] w-full max-w-md mx-auto py-10 px-5">
      <div className="flex flex-col items-center gap-2 mb-10">
        <h1 className="text-2xl font-bold max-sm:text-xl">
          ✈️ 여행하고 싶은 도시는 어디인가요?
        </h1>
        <span className="text-md text-gray-500 text-center max-sm:text-sm">
          1개의 도시를 선택해주세요.
        </span>
      </div>
      <div className="flex flex-col gap-10">
        <QuestionSection
          title="일본"
          contents={["도쿄", "오사카", "후쿠오카", "삿포로", "오키나와"]}
          onContentSelect={handleContentSelect}
          selectedContent={selectedContent}
        />
        <QuestionSection
          title="중국"
          contents={["베이징", "충칭", "상하이", "광저우", "텐진"]}
          onContentSelect={handleContentSelect}
          selectedContent={selectedContent}
        />
        <QuestionSection
          title="대한민국"
          contents={["서울", "가평", "강릉", "여수", "부산", "제주"]}
          onContentSelect={handleContentSelect}
          selectedContent={selectedContent}
        />
      </div>
      <Link href={`/plan?city=${selectedContent}`}>
        <Button
          disabled={disabled}
          variant="brand"
          size="lg"
          className="w-full mt-10"
        >
          다음
        </Button>
      </Link>
    </div>
  );
}
