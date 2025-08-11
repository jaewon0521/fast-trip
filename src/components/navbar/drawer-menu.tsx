import { getUser } from "@/utils/auth";
import { MenuIcon, XIcon } from "lucide-react";
import UserInfo from "./user-info";
import KakaoLogin from "./kakao-login";
import NavbarLink from "./navbar-link";

export default async function DrawerMenu() {
  const user = await getUser();

  return (
    <div className="drawer drawer-end w-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
        <MenuIcon />
      </label>
      <div className="drawer-side">
        <div className="drawer-overlay" style={{ cursor: "auto" }}></div>
        <ul className="bg-base-200 text-base-content min-h-full w-80 p-4">
          <div>
            <div className="flex justify-end mb-4">
              <button aria-label="close sidebar">
                <label
                  className="cursor-pointer"
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                >
                  <XIcon />
                </label>
              </button>
            </div>
            <div className="mb-4">
              {user ? <UserInfo user={user} /> : <KakaoLogin />}
            </div>
          </div>
          <li>
            <NavbarLink title="내 여행" href="/user/plan" />
          </li>
          <li>
            <NavbarLink title="나만의 여행" href="/schedule/question" />
          </li>
          <li>
            <NavbarLink title="AI 추천 여행" href="/schedule/suggest" />
          </li>

          {user && (
            <div className="mt-4">
              <form action="/api/auth/logout" method="POST" className="m-0">
                <button
                  className="w-full h-[40px] px-2 py-1 mx-auto border-1 border-gray-400 rounded-md cursor-pointer"
                  type="submit"
                >
                  <span className="text-md font-medium text-black">
                    로그아웃
                  </span>
                </button>
              </form>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
