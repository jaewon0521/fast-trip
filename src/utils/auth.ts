import { createClientByServer } from "./supabase/server";

export const getUser = async () => {
  const supabase = await createClientByServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
