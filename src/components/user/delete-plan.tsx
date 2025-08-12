"use client";

import { deletePlan } from "@/action/plan/api";
import { Trash2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface DeletePlanProps {
  id: string;
}

export default function DeletePlan({ id }: DeletePlanProps) {
  const [state, formAction, pending] = useActionState(deletePlan, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message);
    }
  }, [state?.error, state?.message]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="cursor-pointer"
        disabled={pending}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
}
