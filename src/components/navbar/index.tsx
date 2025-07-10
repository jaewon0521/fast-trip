import { getUser } from "@/utils/auth";
import { Button } from "../ui/button";
import Image from "next/image";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="sticky top-0 z-[9999] py-1.5 px-0 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16 max-w-[768px]:py-0 px-4">
        <div>
          <h1 className="font-bold text-2xl text-blue-500 text-decoration-none max-w-[768px]:text-sm">Fast Trip</h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">안녕하세요, {user.user_metadata.name}님!</span>
              <form action="/api/auth/logout" method="POST" className="m-0">
                <Button type="submit" variant="destructive">
                  로그아웃
                </Button>
              </form>
            </div>
          ) : (
            <form action="/api/auth/kakao" className="m-0">
              <button
                type="submit"
                className="w-[183px] h-[45px] bg-[url('/images/kakao_login_medium_narrow.png')] bg-no-repeat bg-center bg-contain border-none p-0 m-0 cursor-pointer"
                aria-label="카카오로 로그인"
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
