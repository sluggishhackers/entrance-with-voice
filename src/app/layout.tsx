import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_ORG_NAME}에 오신 것을 환영합니다!`,
  description: "이 페이지는 슬러기시 해커스 커뮤니티에서 만들어졌습니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
