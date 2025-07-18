import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import { NextResponseError } from "@/lib/serverError";
import { PlaceTextSearchResponse } from "@/service/google/places-dto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const region = searchParams.get("region");
  const name = searchParams.get("name");

  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const fields =
    "place_id,name,formatted_address,geometry.location,rating,photos";
  const language = "ko";

  if (!name) {
    return new NextResponseError().BadRequest("장소 이름을 입력해 주세요.");
  }

  if (!region) {
    return new NextResponseError().BadRequest("도시를 선택해 주세요.");
  }

  if (!GoogleApiKey) {
    return new NextResponseError().Unauthorized(
      "Google API 키가 설정되지 않았습니다."
    );
  }
  const query = `${name} ${region}`; // 모토무라 후쿠오카
  try {
    const data = await httpClient("google-map")
      .url(
        `/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&fields=${fields}&language=${language}&key=${GoogleApiKey}`
      )
      .call<PlaceTextSearchResponse>();

    return NextResponse.json(data);
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().InternalServerError(error.message);
  }
}
