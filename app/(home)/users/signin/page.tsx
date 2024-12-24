"use client"

import { signIn, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast"

export default function SignInPage() {
  const { status } = useSession()

  const handleClickGoogle = () => {
    console.log("login!")
    try {
      signIn("google", { callbackUrl: "/" })
    } catch (e) {
      console.log(e)
      toast.error("다시 시도해주세요")
    }
  }

  return (
    <div className="max-w-xl mx-auto pt-10 pb-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-semibold text-center">
          로그인 또는 회원가입
        </h1>
        <hr className="border-b-gray-300" />
        <div className="text-xl md:text-2xl font-semibold">
          Nextbnb에 오신 것을 환영합니다.
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        SNS 계정을 이용해서 로그인 또는 회원가입을 해주세요.
      </div>
      <div className="flex flex-col gap-5 mt-16">
        <button
          type="button"
          onClick={handleClickGoogle}
          className="relative border border-gray-700 rounded-md py-3 text-sm hover:bg-black/5 text-center font-semibold"
        >
          <FcGoogle className="absolute left-5 text-xl" />
          구글로 로그인하기
        </button>
      </div>
    </div>
  )
}
