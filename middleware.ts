export { default } from "next-auth/middleware"

// 로그인 된 사용자만 들어오게~
export const config = {
  matcher: ["/users/mypage", "/users/info", "/users/edit"],
}
