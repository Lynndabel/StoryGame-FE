"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { liskSepolia } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

export const SUPPORTED_CHAIN_ID = 4202; // to be changed to 4202...11155111

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const origin =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://craftlink-hq.vercel.app";
const metadata = {
  name: "craftLink",
  description: "The Future of Decentralized Commerce",
  url: origin,
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [liskSepolia], // [mainnet, arbitrum, avalanche, base, optimism, polygon]
  defaultNetwork: liskSepolia,
  metadata: metadata,
  features: {
    email: true,
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
    emailShowWallets: false, // if true, will show all wallets
  },
  allWallets: "SHOW",
  themeVariables: {
    "--w3m-accent": "#262208",
    "--w3m-color-mix": "#333333",
    "--w3m-color-mix-strength": 20,
  },
});

function ContextProvider({
  children,
  cookies,
}: Readonly<{ children: ReactNode; cookies: string | null }>) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
