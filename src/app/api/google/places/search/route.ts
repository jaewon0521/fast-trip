import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!region) {
    return NextResponse.json({ error: "Region is required" }, { status: 400 });
  }

  if (!GoogleApiKey) {
    return NextResponse.json({ error: "Google Map API Key is not set" }, { status: 500 });
  }

  try {
    const fields = "place_id,name,formatted_address,geometry.location,rating,photos";
    const language = "ko";

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${"후쿠오카 주변 맛집 및 주변 명소"}&key=${GoogleApiKey}&fields=${fields}&language=${language}`,
      {
        next: {
          revalidate: 60 * 60 * 24, // 1시간 캐싱
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("서버 오류: ", e);
    return NextResponse.json({ message: "내부 서버 오류 발생" }, { status: 500 });
  }
}
