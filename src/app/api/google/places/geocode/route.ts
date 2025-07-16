import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { NextResponseError } from "@/lib/serverError";
import { GeocodingResponse } from "@/service/google/geocode-dto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 쿼리 파라미터에서 place_id 추출
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!region) {
    return new NextResponseError().BadRequest("도시를 선택해 주세요.");
  }

  if (!GoogleApiKey) {
    return new NextResponseError().Unauthorized(
      "Google API 키가 설정되지 않았습니다."
    );
  }

  try {
    const data = await httpClient("google-map")
      .url(`/geocode/json?address=${region}&language=ko&key=${GoogleApiKey}`)
      .call<GeocodingResponse>();

    return NextResponse.json(data.results[0]);
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().InternalServerError(error.message);
  }
}
