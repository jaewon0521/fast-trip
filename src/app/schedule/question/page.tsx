"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuestionPage() {
  const [disabled, setDisabled] = useState(true);

  return (
    <form
      action="
        "
    >
      <div className="border border-gray-200 rounded-lg p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">✈️ 여행하고 싶은 도시는 어디인가요?</h1>
          <span className="text-lg text-gray-500 text-center">도시를 선택해주세요.</span>
        </div>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">일본</h2>
          <ul>
            <li>도쿄</li>
            <li>오사카</li>
            <li>후쿠오카</li>
            <li>나고야</li>
            <li>교토</li>
            <li>삿포로</li>
            <li>오키나와</li>
          </ul>
        </section>
        <section>
          <h2>중국</h2>
          <ul>
            <li>베이징</li>
            <li>충칭</li>
            <li>상하이</li>
            <li>광저우</li>
            <li>텐진</li>
          </ul>
        </section>
        <section>
          <h2>대한민국</h2>
          <ul>
            <li>서울</li>
            <li>가평</li>
            <li>강릉</li>
            <li>여수</li>
            <li>부산</li>
            <li>제주</li>
          </ul>
        </section>
        <Button disabled={disabled} variant="brand" size="lg">
          다음
        </Button>
      </div>
    </form>
  );
}

/**
 * type
 *  region, days, who, style
 */
