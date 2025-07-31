import { useState } from "react";
import { QuestionContent } from "./question-content";
import QuestionHeader from "./question-header";
import QuestionTemplate from "./question-template";

interface QuestionCompanionProps {
  onNext: (companion: string) => void;
  stepCurrent: number;
  stepTotal: number;
}

export default function QuestionCompanion({ onNext, stepCurrent, stepTotal }: QuestionCompanionProps) {
  const [selectedContent, setSelectedContent] = useState("");

  const handleContentSelect = (companion: string) => {
    setSelectedContent(companion);
  };
  return (
    <QuestionTemplate
      header={
        <QuestionHeader
          title="여행 동행자는 누구인가요?"
          description="동행자를 1개만 선택해주세요."
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      }
      body={
        <QuestionContent
          title="동행자"
          contents={["혼자", "친구", "연인", "가족"]}
          onContentSelect={handleContentSelect}
          selectedContent={selectedContent}
        />
      }
      footer={
        <button
          onClick={() => onNext(selectedContent)}
          disabled={!selectedContent}
          className="w-full mt-10 btn btn-lg bg-blue-500 text-white text-lg rounded-2xl px-10 hover:bg-blue-600"
        >
          다음
        </button>
      }
    />
  );
}
