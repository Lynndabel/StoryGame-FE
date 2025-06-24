// src/components/user/WalletConnect.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdAccountBalanceWallet,
  MdContentCopy,
  MdOpenInNew,
  MdSwapHoriz,
  MdLogout,
  MdError,
  MdCheckCircle
} from 'react-icons/md';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';

interface WalletConnectProps {
  isConnected?: boolean;
  address?: string;
  balance?: {
    eth: number;
    story: number;
    read: number;
  };
  network?: {
    name: string;
    chainId: number;
    color: string;
  };
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSwitchNetwork?: (chainId: number) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected = false,
  address = '',
  balance = { eth: 0, story: 0, read: 0 },
  network = { name: 'Arbitrum', chainId: 42161, color: '#1B4EA6' },
  onConnect,
  onDisconnect,
  onSwitchNetwork,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const supportedNetworks = [
    { name: 'Arbitrum One', chainId: 42161, color: '#1B4EA6' },
    { name: 'Optimism', chainId: 10, color: '#FF0420' },
    { name: 'Polygon', chainId: 137, color: '#8247E5' },
    { name: 'Base', chainId: 8453, color: '#0052FF' },
  ];

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊', description: 'Connect using MetaMask wallet' },
    { name: 'WalletConnect', icon: '🔗', description: 'Connect using WalletConnect' },
    { name: 'Coinbase Wallet', icon: '🔵', description: 'Connect using Coinbase Wallet' },
    { name: 'Injected', icon: '💼', description: 'Connect using injected wallet' },
  ];

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(2)}K`;
    return amount.toFixed(4);
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrls: { [key: number]: string } = {
        42161: 'https://arbiscan.io',
        10: 'https://optimistic.etherscan.io',
        137: 'https://polygonscan.com',
        8453: 'https://basescan.org',
      };
      const baseUrl = explorerUrls[network.chainId] || 'https://etherscan.io';
      window.open(`${baseUrl}/address/${address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <>
        <Button
          variant="primary"
          size="md"
          icon={MdAccountBalanceWallet}
          onClick={() => setIsModalOpen(true)}
        >
          Connect Wallet
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Connect Your Wallet"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-dark-300 text-center mb-6">
              Choose your preferred wallet to connect to StoryDAO
            </p>

            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => {
                  onConnect?.();
                  setIsModalOpen(false);
                }}
                className="w-full p-4 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-primary-500 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="text-left">
                    <div className="text-white font-medium group-hover:text-primary-300">
                      {wallet.name}
                    </div>
                    <div className="text-dark-400 text-sm">{wallet.description}</div>
                  </div>
                </div>
              </button>
            ))}

            <div className="pt-4 border-t border-dark-700">
              <p className="text-dark-400 text-xs text-center">
                By connecting a wallet, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3"
      >
        {/* Network Indicator */}
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: network.color }}
        />
        
        {/* Address */}
        <span className="font-mono">{formatAddress(address)}</span>
        
        {/* Balance */}
        <Badge variant="primary" size="sm">
          {formatBalance(balance.eth)} ETH
        </Badge>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-dark-800 border border-dark-600 rounded-xl shadow-xl z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Connected Wallet</span>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-dark-300 text-sm">{network.name}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-dark-200 font-mono text-sm">{formatAddress(address)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={copied ? MdCheckCircle : MdContentCopy}
                  onClick={copyAddress}
                  className={`!p-1 ${copied ? 'text-accent-400' : ''}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={MdOpenInNew}
                  onClick={openExplorer}
                  className="!p-1"
                />
              </div>
            </div>

            {/* Balances */}
            <div className="p-4 border-b border-dark-700">
              <h4 className="text-white font-medium mb-3">Balances</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-dark-300">ETH</span>
                  <span className="text-white font-medium">{formatBalance(balance.eth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">STORY</span>
                  <span className="text-white font-medium">{formatBalance(balance.story)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">READ</span>
                  <span className="text-white font-medium">{formatBalance(balance.read)}</span>
                </div>
              </div>
            </div>

            {/* Network Selection */}
            <div className="p-4 border-b border-dark-700">
              <h4 className="text-white font-medium mb-3">Switch Network</h4>
              <div className="space-y-2">
                {supportedNetworks.map((net) => (
                  <button
                    key={net.chainId}
                    onClick={() => {
                      onSwitchNetwork?.(net.chainId);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      net.chainId === network.chainId
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'hover:bg-dark-700 text-dark-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: net.color }}
                      />
                      <span>{net.name}</span>
                    </div>
                    {net.chainId === network.chainId && (
                      <MdCheckCircle className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                icon={MdSwapHoriz}
                fullWidth
                className="justify-start"
              >
                Bridge Assets
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={MdLogout}
                onClick={() => {
                  onDisconnect?.();
                  setIsDropdownOpen(false);
                }}
                fullWidth
                className="justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Disconnect
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

