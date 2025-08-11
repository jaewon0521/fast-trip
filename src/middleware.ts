import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./utils/auth";
import { PATH } from "./constants/path";

const protectRoutes = [
  PATH.MY_PLAN,
  PATH.AI_SUGGEST,
  PATH.QUESTION,
  PATH.SUGGEST,
  PATH.PLAN,
];

export const middleware = async (request: NextRequest) => {
  const user = await getUser();

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectRoutes.includes(pathname);

  if (isProtectedRoute && !user?.id) {
    return NextResponse.redirect(new URL(PATH.LOGIN, request.url));
  }

  return NextResponse.next({ request });
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
