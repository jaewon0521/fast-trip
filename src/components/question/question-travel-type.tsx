import { useState } from "react";
import QuestionTemplate from "./question-template";
import QuestionHeader from "./question-header";
import { QuestionContent } from "./question-content";

interface QuestionTravelTypeProps {
  onNext: (type: string) => void;
  stepCurrent: number;
  stepTotal: number;
}

export default function QuestionTravelType({
  onNext,
  stepCurrent,
  stepTotal,
}: QuestionTravelTypeProps) {
  const [selectedContent, setSelectedContent] = useState("");

  const handleContentSelect = (type: string) => {
    setSelectedContent(type);
  };
  return (
    <QuestionTemplate
      header={
        <QuestionHeader
          title="여행 스타일은 무엇인가요?"
          description="여행 스타일을 1개만 선택해주세요."
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      }
      body={
        <QuestionContent
          title="스타일"
          contents={["맛집", "명소", "문화,예술,역사", "쇼핑", "레저", "힐링"]}
          onContentSelect={handleContentSelect}
          selectedContent={selectedContent}
        />
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
