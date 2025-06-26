
  
  // src/utils/web3/wagmi-config.ts
  import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
  import { configureChains, createConfig } from 'wagmi';
  import { arbitrum, optimism, polygon, base } from 'wagmi/chains';
  import { publicProvider } from 'wagmi/providers/public';
  import { alchemyProvider } from 'wagmi/providers/alchemy';
  
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [arbitrum, optimism, polygon, base],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
      publicProvider(),
    ]
  );
  
  const { wallets } = getDefaultWallets({
    appName: 'StoryDAO',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
  });
  
  const connectors = connectorsForWallets([
    ...wallets,
    // Add custom wallets if needed
  ]);
  
  export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
  
  export { chains };
  
  
 
  
  