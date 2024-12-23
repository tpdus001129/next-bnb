import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextLayout, NextProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nextbnb",
  description: " 숙박 예약 플랫폼",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  )
}
