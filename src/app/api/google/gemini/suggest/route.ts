import { extractError } from "@/lib/error";
import { NextResponseError } from "@/lib/serverError";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { region, startDate, endDate, who, type } = body;

  if (!region || !startDate || !endDate || !who || !type) {
    return new NextResponseError().BadRequest("올바르지 않은 요청 입니다.");
  }

  try {
    const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(GoogleApiKey || "");

    // API 요청 모델
    // responseSchema 응답 JSON 형식 정의
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              day: { type: SchemaType.NUMBER },
              place_id: { type: SchemaType.STRING },
              name: { type: SchemaType.STRING },
              formatted_address: { type: SchemaType.STRING },
              types: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              geometry: {
                type: SchemaType.OBJECT,
                properties: {
                  location: {
                    type: SchemaType.OBJECT,
                    properties: {
                      lat: { type: SchemaType.NUMBER },
                      lng: { type: SchemaType.NUMBER },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const prompt = `당신은 ${region} 지역 전문 여행 플래너입니다.

                    **여행 정보:**
                    - 기간: ${startDate} ~ ${endDate}
                    - 동행자: ${who}  
                    - 지역: ${region}
                    - 여행 스타일: ${type}

                    **중요: 좌표 정확도 요구사항**
                    - 모든 장소의 위도/경도는 실제 Google Maps에서 확인 가능한 정확한 좌표여야 합니다
                    - 좌표는 소수점 6자리까지 정확히 제공해주세요 (예: 37.566535, 126.977969)
                    - 존재하지 않는 장소나 추정 좌표는 절대 사용하지 마세요
                    - 유명한 랜드마크나 대형 건물의 정확한 좌표를 사용해주세요

                    **핵심 요구사항 (반드시 준수):**
                    1. **일정 구성**: 매일 정확히 6개 ~ 10개 장소 추천 (필수)
                    2. **식사 계획**: 매일 점심 식당 1곳, 저녁 식당 1곳 반드시 포함 (필수)
                    3. **여행 스타일**: 전체 장소의 70% 이상을 ${type} 스타일에 맞게 구성
                    4. **교통**: 대중교통 이용 기준 동선 최적화
                    5. **시간 배분**: 오전(09:00-12:00), 점심(12:00-14:00), 오후(14:00-18:00), 저녁(18:00-21:00)

                    **응답 형식 지침:**
                    - 각 장소는 Google Places API 형식에 맞춰 실제 존재하는 장소만 추천
                    - place_id는 실제 Google Places의 place_id 형식으로 제공 (예: ChIJ...)
                    - formatted_address는 정확한 주소 형식으로 제공
                    - types는 Google Places API의 표준 타입 사용 (예: ["restaurant", "food", "establishment"])
                    - 좌표는 실제 위도/경도 값으로 제공
                    - name은 한국어로 제공

                    **품질 체크리스트:**
                    응답하기 전 다음을 반드시 확인하세요:
                    □ 각 날짜마다 6-10개 장소 포함
                    □ 각 날짜마다 점심 식당(restaurant 타입) 1개 이상
                    □ 각 날짜마다 저녁 식당(restaurant 타입) 1개 이상  
                    □ ${type} 스타일 장소가 70% 이상
                    □ 모든 장소가 실제 존재하는 곳
                    □ 올바른 JSON 배열 형식

                    지금 ${region}의 ${type} 여행 일정을 작성해주세요.`;

    const response = await model.generateContent(prompt);
    const data = await response.response.text();
    const jsonResponse = JSON.parse(data);

    return NextResponse.json(jsonResponse);
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().InternalServerError(error.message);
  }
}
