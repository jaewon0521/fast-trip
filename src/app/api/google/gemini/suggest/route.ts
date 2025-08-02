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
        temperature: 0.8,
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

    const prompt = `너는 전문 여행 플래너야. ${startDate}부터 ${endDate}까지 ${who}와 함께 ${region}를 여행할 계획이야. ${type} 여행을 선호하고, 대중교통을 주로 이용할 예정이야. 하루 여행 추천지는 최소 6개 부터 최대 10개야. 중간 점심과 저녁에 들려야 하는 맛집도 추천 해줘야돼. 다음 JSON 형식으로 각 날짜별 여행 일정을 추천해줘. 각 장소(place)는 'name', 'description', 'address', 'types', 'geometry' 키를 포함해야 해 'places/search' API에서 사용 가능한 형식이어야 해. 
    `;

    const response = await model.generateContent(prompt);
    const data = await response.response.text();
    const jsonResponse = JSON.parse(data);

    return NextResponse.json(jsonResponse);
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().InternalServerError(error.message);
  }
}
