import { PlaceResult } from "@/service/google/places-dto";

export enum TipPlannerMode {
  EDIT = "edit",
  SHOW = "show",
}

export type MarkersByDay = Record<number, PlaceResult[]>;