import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { liskSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
// Try to get the project ID from env variables. Use NEXT_PUBLIC_ prefix so that the value is
// injected into client-side bundles by Next.js. Fallback to PROJECT_ID for server-side use.
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? process.env.PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [liskSepolia] // [mainnet, sepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig