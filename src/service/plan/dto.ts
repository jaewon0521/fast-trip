import { MarkersByDay } from "@/components/plan/trip-planner";

export interface ParsePlanDto extends Omit<PlanDto, "places"> {
  places: MarkersByDay;
}

export interface PlanDto {
  id: string;
  userId: string;
  region: string;
  places: string;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
}
