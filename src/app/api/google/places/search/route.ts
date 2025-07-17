import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { NextResponseError } from "@/lib/serverError";
import { PlaceTextSearchResponse } from "@/service/google/places-dto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  //호출 쿼리 파라미터 설정
  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const fields =
    "place_id,name,formatted_address,geometry.location,rating,photos";
  const language = "ko";
  const query = `${region} 주변 맛집 및 주변 명소`;
  const radius = 5000;

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
      .url(
        `/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&radius=${radius}&location=${lat},${lng}&key=${GoogleApiKey}&fields=${fields}&language=${language}`
      )
      .call<PlaceTextSearchResponse>();

    return NextResponse.json(data);
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().InternalServerError(error.message);
  }
}
