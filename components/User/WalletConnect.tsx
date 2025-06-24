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

// src/components/user/UserStats.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdHowToVote,
  MdVisibility,
  MdTrendingUp,
  MdCreate,
  MdBookmark,
  MdStar,
  MdPeople
} from 'react-icons/md';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface UserStatsProps {
  stats: {
    storiesCreated: number;
    chaptersWritten: number;
    totalVotes: number;
    totalViews: number;
    storiesRead: number;
    chaptersRead: number;
    bookmarks: number;
    followers: number;
    following: number;
    reputation: number;
    tokensEarned: number;
    rank: string;
    joinedDate: string;
    streak: number;
  };
  showDetailed?: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ stats, showDetailed = false }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'legend': return 'text-yellow-400';
      case 'expert': return 'text-purple-400';
      case 'advanced': return 'text-blue-400';
      case 'intermediate': return 'text-green-400';
      case 'beginner': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const primaryStats = [
    { label: 'Stories Created', value: stats.storiesCreated, icon: MdAutoStories, color: 'text-primary-400' },
    { label: 'Chapters Written', value: stats.chaptersWritten, icon: MdCreate, color: 'text-secondary-400' },
    { label: 'Total Votes', value: stats.totalVotes, icon: MdHowToVote, color: 'text-accent-400' },
    { label: 'Total Views', value: stats.totalViews, icon: MdVisibility, color: 'text-blue-400' },
  ];

  const readerStats = [
    { label: 'Stories Read', value: stats.storiesRead, icon: MdAutoStories },
    { label: 'Chapters Read', value: stats.chaptersRead, icon: MdCreate },
    { label: 'Bookmarks', value: stats.bookmarks, icon: MdBookmark },
    { label: 'Reading Streak', value: stats.streak, icon: MdTrendingUp, suffix: 'days' },
  ];

  const socialStats = [
    { label: 'Followers', value: stats.followers, icon: MdPeople },
    { label: 'Following', value: stats.following, icon: MdPeople },
    { label: 'Reputation', value: stats.reputation, icon: MdStar },
  ];

  if (!showDetailed) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {primaryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Your Statistics</h3>
          <div className="flex items-center space-x-3">
            <Badge variant="primary" size="md" icon={MdStar}>
              {stats.reputation} Rep
            </Badge>
            <Badge variant="secondary" size="md" className={getRankColor(stats.rank)}>
              {stats.rank}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {primaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-dark-700 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Reading Stats */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Reading Activity</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {readerStats.map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-dark-800 rounded-xl">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent-400" />
              <div className="text-xl font-bold text-white mb-1">
                {formatNumber(stat.value)}{stat.suffix && ` ${stat.suffix}`}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Social Stats */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialStats.map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-dark-800 rounded-xl">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-secondary-400" />
              <div className="text-xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Indicators */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Progress</h4>
        <div className="space-y-4">
          {/* Reputation Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-dark-300">Reputation Progress</span>
              <span className="text-white">{stats.reputation}/1000</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.reputation / 1000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Tokens Earned */}
          <div className="flex justify-between items-center">
            <span className="text-dark-300">Total Tokens Earned</span>
            <span className="text-accent-400 font-bold">{formatNumber(stats.tokensEarned)} STORY</span>
          </div>

          {/* Member Since */}
          <div className="flex justify-between items-center">
            <span className="text-dark-300">Member Since</span>
            <span className="text-white">{new Date(stats.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};



