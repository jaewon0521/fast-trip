import { createClientByServer } from "@/utils/supabase/server";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClientByServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    // If user is not logged in, redirect to the login page
    return (
      <form className={styles.main} action={"/api/auth/kakao"}>
        <button type="submit">카카오 로그인</button>
      </form>
    );
  }

  console.log(user);
  console.log(session);

  return <div>{user.user_metadata.name}</div>;
}
