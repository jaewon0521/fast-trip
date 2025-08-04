import { useState } from "react";
import QuestionTemplate from "./question-template";
import QuestionHeader from "./question-header";
import { QuestionContent } from "./question-content";

interface QuestionCityProps {
  onNext: (city: string) => void;
  stepCurrent: number;
  stepTotal: number;
}

export default function QuestionCity({
  onNext,
  stepCurrent,
  stepTotal,
}: QuestionCityProps) {
  const [selectedContent, setSelectedContent] = useState("");

  const handleContentSelect = (city: string) => {
    setSelectedContent(city);
  };

  return (
    <QuestionTemplate
      header={
        <QuestionHeader
          title="✈️ 여행하고 싶은 도시는 어디인가요?"
          description="1개의 도시를 선택해주세요."
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      }
      body={
        <>
          <QuestionContent
            title="일본"
            contents={["도쿄", "오사카", "후쿠오카", "삿포로", "오키나와"]}
            onContentSelect={handleContentSelect}
            selectedContent={selectedContent}
          />
          <QuestionContent
            title="중국"
            contents={["베이징", "충칭", "상하이", "광저우", "텐진"]}
            onContentSelect={handleContentSelect}
            selectedContent={selectedContent}
          />
          <QuestionContent
            title="대한민국"
            contents={["서울", "가평", "강릉", "여수", "부산", "제주"]}
            onContentSelect={handleContentSelect}
            selectedContent={selectedContent}
          />
        </>
      }
      footer={
        <button
          onClick={() => onNext(selectedContent)}
          disabled={!selectedContent}
          className="w-full btn btn-lg bg-blue-500 text-white text-lg rounded-2xl px-10 hover:bg-blue-600"
        >
          다음
        </button>
      }
    />
  );
}
