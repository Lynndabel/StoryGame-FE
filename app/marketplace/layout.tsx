"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col bg-[url('/bg.png')] min-h-screen  bg-opacity-[25%]">
        <div className="flex flex-col bg-[#333333] bg-opacity-[95%] min-h-screen ">
          <div className="min-h-screen">{children}</div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
