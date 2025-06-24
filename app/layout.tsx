import type { Metadata } from "next";
import "./globals.css";
import { Mooli, Merriweather, Alata } from "next/font/google";
import ContextProvider from "@/context/index";
import { headers } from "next/headers";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { FilterStateProvider } from "@/context/filter";
import { Toaster } from "sonner";


const mooli = Mooli({
  subsets: ["latin"],
  weight: ["400"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const alata = Alata({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CraftLink",
  description: "The home of artisans and thier clients",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");


  return (
    <html lang="en">
      <body
        className={`${mooli.className} ${merriweather.className} ${alata.className} antialiased`}
      >
          <Toaster />
          <AnimatedWrapper>
            <ContextProvider cookies={cookies}>
              <FilterStateProvider>{children}</FilterStateProvider>
            </ContextProvider>
          </AnimatedWrapper>
      </body>
    </html>
  );
}
