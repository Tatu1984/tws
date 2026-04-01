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

// p22-underground is loaded via Adobe Typekit in the head below

export const metadata: Metadata = {
  title: "Ten Sparrows - Modern Computing for Real-World Operations",
  description: "We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.",
  keywords: ["edge computing", "micro data centers", "AI", "automation", "local computing"],
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://use.typekit.net/ivt8xmt.js" />
        <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load();}catch(e){}' }} />
      </head>
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
