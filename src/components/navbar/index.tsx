import { getUser } from "@/utils/auth";
import styles from "./navbar.module.css";
import { Button } from "../ui/button";

export default async function Navbar() {
  const user = await getUser();

  console.log(user);

  return (
    <nav className="sticky top-0 z-[9999] py-1.5 px-0 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16">
        <div className={styles.navbarBrand}>
          <h1>Fast Trip</h1>
        </div>
        <div className={styles.navbarMenu}>
          {user ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>안녕하세요, {user.user_metadata.name}님!</span>
              <form action="/api/auth/logout" method="POST" className={styles.logoutForm}>
                <button type="submit" className={styles.logoutBtn}>
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            <form action="/api/auth/kakao" className={styles.loginForm}>
              <button type="submit" className={styles.loginBtn}>
                로그인
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
