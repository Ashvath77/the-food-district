"use client";
import "./globals.css";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FloatingEmojis from "../components/FloatingEmojis";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // FORCE REDIRECT TO HOME ON REFRESH
  useEffect(() => {
    if (pathname !== "/") {
      router.push("/");
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#0F0F0F] text-white antialiased overflow-x-hidden">
        {/* The Emoji Layer is now fixed and global */}
        <FloatingEmojis />
        
        {/* The Navbar */}
        <Navbar />
        
        {/* Added dynamic padding to prevent any overlap on any page */}
        <main className="relative z-10 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}