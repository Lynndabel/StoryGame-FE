 
  // src/components/user/WalletConnect.tsx (Updated with RainbowKit)
  import React from 'react';
  import { ConnectButton } from '@rainbow-me/rainbowkit';
  import { useAccount, useBalance, useDisconnect } from 'wagmi';
  import { Button } from '../UI/Button';
  import { Badge } from '../UI/Badge';
  
  export const WalletConnect: React.FC = () => {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button
                      variant="primary"
                      onClick={openConnectModal}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500"
                    >
                      Connect Wallet
                    </Button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <Button
                      variant="secondary"
                      onClick={openChainModal}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Wrong network
                    </Button>
                  );
                }
  
                return (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={openChainModal}
                      className="flex items-center space-x-2"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>
  
                    <Button
                      variant="ghost"
                      onClick={openAccountModal}
                      className="flex items-center space-x-2"
                    >
                      <span className="font-mono">
                        {account.displayName}
                      </span>
                      <Badge variant="primary" size="sm">
                        {account.displayBalance}
                      </Badge>
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  };