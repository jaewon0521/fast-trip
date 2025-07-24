import { extractError } from "@/lib/error";
import { NextResponseError } from "@/lib/serverError";
import { getUser } from "@/utils/auth";
import { createClientByServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    return Response.json({});
  } catch (e) {
    const error = extractError(e);

    return new NextResponseError().BadRequest(error.message);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClientByServer();
    const user = await getUser();
    const body = await request.json();

    const { data, error } = await supabase.from("plan").insert({
      userId: user?.id,
      region: body.region,
      places: body.places,
      start_at: body.start_at,
      end_at: body.end_at,
    });

    if (error) {
      return new NextResponseError().BadRequest(error.message);
    }

    return NextResponse.json({
      message: "데이터가 성공적으로 저장 되었습니다.",
    });
  } catch (e) {
    const error = extractError(e);
    return new NextResponseError().BadRequest(error.message);
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClientByServer();
    const user = await getUser();

    if (!user) {
      return new NextResponseError().BadRequest("존재 하지 않는 계정 입니다.");
    }

    // const {data, error} = await supabase.from('plan').select('*').eq('userId', user.id).single()

    
  } catch (e) {
    const error = extractError(e);
    return new NextResponseError().BadRequest(error.message);
  }
}