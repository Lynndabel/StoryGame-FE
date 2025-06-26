// src/pages/_app.tsx (Updated)
  import type { AppProps } from 'next/app';
  import { WagmiConfig } from 'wagmi';
  import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { wagmiConfig, chains } from '@/utils/wagmi';
  import '@rainbow-me/rainbowkit/styles.css';
  import '@/styles/globals.css';
  
  const queryClient = new QueryClient();
  
  export default function App({ Component, pageProps }: AppProps) {
    return (
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            chains={chains}
            theme={darkTheme({
              accentColor: '#0ea5e9',
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
            })}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
    );
  }