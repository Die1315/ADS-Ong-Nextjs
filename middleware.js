import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // No funciona jwbtoken no soporta la red edge (CDN) se reemplaza por jose 


export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
    
  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("secret")
    );
    // console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/index", "/dashboard"],
};
