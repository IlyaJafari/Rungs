import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const coachPaths = [
  "/dashboard",
  "/clients",
  "/invite",
  "/profile",
  "programs",
  "/help",
];

const clientPaths = ["/home"];

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isCoachRoute = coachPaths.some((path) => pathname.startsWith(path));
  const isClientRoute = clientPaths.some((path) => pathname.startsWith(path));
  const isLoginRoute = pathname.startsWith("/login");

  // Not logged in
  if ((isCoachRoute || isClientRoute) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in, but visiting a role-restricted route
  if (user && (isCoachRoute || isClientRoute || isLoginRoute)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;

    if (isCoachRoute && role !== "coach") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (isClientRoute && role !== "athlete") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isLoginRoute) {
      const destination = role === "athlete" ? "/home" : "/dashboard";
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
