"use server";

import { MarkersByDay } from "@/components/trip/type";
import { PATH } from "@/constants/path";
import { extractError } from "@/lib/error";
import { PlanDto } from "@/service/plan/dto";
import { getUser } from "@/utils/auth";
import { createClientByServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 여행 계획 조회
 */
export const getPlan = async (): Promise<PlanDto[]> => {
  const supabase = await createClientByServer();
  const user = await getUser();

  if (!user) {
    return redirect(PATH.HOME);
  }

  const { data, error } = await supabase
    .from("plan")
    .select("*")
    .eq("userId", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * 여행 계획 상세 조회
 */
export const getPlanDetail = async (id: string): Promise<PlanDto> => {
  const supabase = await createClientByServer();

  const { data, error } = await supabase
    .from("plan")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * 여행 계획 저장
 */
export const savePlan = async (
  body: {
    region: string;
    places: MarkersByDay;
    start_at: string;
    end_at: string;
  }
) => {
  const supabase = await createClientByServer();
  const user = await getUser();

  if (!user) {
    return redirect(PATH.HOME);
  }

  try {
    const { data, error } = await supabase.from("plan").insert({
      userId: user.id,
      region: body.region,
      places: JSON.stringify(body.places),
      start_at: body.start_at,
      end_at: body.end_at,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "여행 계획이 저장되었습니다.",
    };
  } catch (e) {
    const error = extractError(e);
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * 여행 계획 삭제
 */
export const deletePlan = async (_: unknown, formData: FormData) => {
  const id = formData.get("id");
  const supabase = await createClientByServer();
  const user = await getUser();

  if (!user) {
    redirect(PATH.HOME);
  }

  try {
    if (!id) {
      return {
        error: true,
        message: "여행 계획 삭제에 실패했습니다.",
      };
    }

    const { data, error } = await supabase
      .from("plan")
      .delete()
      .eq("id", id)
      .eq("userId", user.id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(PATH.MY_PLAN);

    return {
      success: true,
      message: "여행 계획이 삭제되었습니다.",
    };
  } catch (e) {
    const error = extractError(e);

    return {
      success: false,
      message: error.message,
    };
  }
};
