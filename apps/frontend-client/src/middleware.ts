import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosInstance from "@/utils/axios-instance";

const protectedRoutes = ["/user-profile", "/allRecords"];

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const username = request.cookies.get("username")?.value;

  // get current path
  const path = request.nextUrl.pathname;
  // if path in protectedroutes in in path that mean isProtectedRoute is true
  const isProtectedRoute = protectedRoutes.includes(path);

  //check for refresh token and username and also protect route that not allow in without token
  if (!access_token && isProtectedRoute) {
    if (refresh_token && username) {
      try {
        // Attempt to refresh the access token
        const response = await axiosInstance.post(
          "http://localhost:5000/auth/refresh-token",
          {
            username: username,
            refreshToken: refresh_token,
          }
        );

        const cookieResponse = NextResponse.next();
        cookieResponse.headers.set(
          "Set-Cookie",
          response.headers["set-cookie"]?.toString() || ""
        );

        return cookieResponse;
      } catch (error) {
        console.log("Error refreshing token", error);
        return NextResponse.redirect(
          new URL("/user-profile/login", request.url)
        );
      }
    } else {
      return NextResponse.redirect(new URL("/user-profile/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user-profile", "/allRecords"],
};
