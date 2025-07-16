import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { GeocodingResponse } from "@/service/google/dto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 쿼리 파라미터에서 place_id 추출
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!region) {
    return NextResponse.json(
      { error: "도시를 선택해 주세요." },
      { status: 400 }
    );
  }
  
  if (!GoogleApiKey) {
    return NextResponse.json(
      { message: "Google API 키가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const data = await httpClient("google-map")
      .url(`/geocode/json?address=${region}&language=ko&key=${GoogleApiKey}`)
      .call<GeocodingResponse>();

    return NextResponse.json(data.results[0]);
  } catch (e) {
    const error = extractError(e);

    console.error("서버 오류:", error);
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
