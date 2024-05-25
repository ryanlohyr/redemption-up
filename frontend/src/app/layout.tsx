import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./Context/store";
import Navbar from "@/components/Navbar";
import Chatbot from "@/feature/Chatbot/components/Chatbot";
import { Providers } from "@/lib/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AppProvider>
            <div className="main">
              {children}
              <div className="fixed bottom-[105px] right-8 z-50">
                <Chatbot />
              </div>
              <Navbar />
            </div>
          </AppProvider>
        </body>
      </html>
    </Providers>
  );
}
