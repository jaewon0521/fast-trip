"use server";

import { PATH } from "@/constants/path";
import { getUser } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getUser();

  if (user) {
    redirect(PATH.HOME);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Link href="/">
          <h1 className="font-bold text-7xl text-blue-500 text-decoration-none max-w-[768px]:text-sm">
            Fast Trip
          </h1>
        </Link>
        <div className="mt-5 mb-10">
          <p className="text-center text-md text-gray-500">
            카카오 소셜 로그인으로 간편하게 이용하세요.
          </p>
        </div>
      </div>
      <form action="/api/auth/kakao">
        <button className="cursor-pointer" type="submit">
          <Image
            src="/images/kakao-login-btn.png"
            alt="Kakao Logo"
            width={256}
            height={40}
          />
        </button>
      </form>
    </div>
  );
}
