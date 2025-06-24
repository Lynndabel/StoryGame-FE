// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Web3Provider } from '@/context/Web3Context';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Web3Provider>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
              },
              success: {
                style: {
                  border: '1px solid #10b981',
                },
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                style: {
                  border: '1px solid #ef4444',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </AuthProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}