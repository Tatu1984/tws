import type { Metadata } from "next";
import { Open_Sans, Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ten Sparrows - Modern Computing for Real-World Operations",
  description: "We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.",
  keywords: ["edge computing", "micro data centers", "AI", "automation", "local computing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${archivo.variable} font-sans antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
