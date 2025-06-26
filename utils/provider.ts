// src/utils/web3/provider.ts
import { ethers } from 'ethers';

export class Web3Provider {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connect(): Promise<{ provider: ethers.BrowserProvider; signer: ethers.Signer; address: string }> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    const address = await this.signer.getAddress();

    return {
      provider: this.provider,
      signer: this.signer,
      address
    };
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const hexChainId = `0x${chainId.toString(16)}`;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        const network = SUPPORTED_NETWORKS[chainId];
        if (!network) throw new Error(`Unsupported network: ${chainId}`);

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: hexChainId,
            chainName: network.name,
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: [network.explorerUrl],
            nativeCurrency: network.currency,
          }],
        });
      } else {
        throw error;
      }
    }
  }

  async getNetwork(): Promise<{ chainId: number; name: string }> {
    if (!this.provider) throw new Error('Provider not connected');
    
    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name
    };
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not connected');
    
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  getSigner(): ethers.Signer | null {
    return this.signer;
  }
}

