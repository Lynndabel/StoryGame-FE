import React from 'react';
import Image from 'next/image';

const CraftcoinBalanceCard: React.FC = () => {
  return (
    <div 
      className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg" 
      style={{
        width: '400px',
        height: '200px',
        backgroundColor: '#F2E8CF0A',
        border: '1px solid #FCFBF726'
      }}
    >
      {/* Background Vector Logo */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20 transition-opacity duration-300">
        <Image
          src="/market/Vector.svg"
          alt="Background logo"
          width={80}
          height={80}
          priority={false}
          onError={(e) => {
            // Hide image if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-10 h-full flex flex-col justify-between">
        {/* Header - Craftcoin Balance */}
        <div className="flex items-center gap-2">
          <Image
            src="/market/coin.svg"
            alt="Craftcoin"
            width={16}
            height={16}
            priority={true}
            onError={(e) => {
              // Fallback to a simple circle if coin icon fails
              e.currentTarget.style.display = 'none';
            }}
          />
          <span 
            className="text-white"
            style={{
              fontFamily: 'Merriweather, serif',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '120%',
              letterSpacing: '5%',
              verticalAlign: 'middle'
            }}
          >
            Craftcoin Balance
          </span>
        </div>
        
        {/* Available Status and Balance Container */}
        <div className="flex flex-col gap-4">
          {/* Available Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span 
              className="text-white"
              style={{
                fontFamily: 'Merriweather, serif',
                fontWeight: 400,
                fontSize: '11px',
                lineHeight: '120%',
                letterSpacing: '0%'
              }}
            >
              Available
            </span>
          </div>
          
          {/* Balance Amount */}
          <div className="flex items-baseline gap-2">
            <span 
              className="text-[#FFCC6D]"
              style={{
                fontFamily: 'Merriweather, serif',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '120%',
                letterSpacing: '0%'
              }}
            >
              500
            </span>
            <span 
              className="text-[#FFCC6D]"
              style={{
                fontFamily: 'Merriweather, serif',
                fontWeight: 400,
                fontSize: '36px',
                lineHeight: '120%',
                letterSpacing: '0%'
              }}
            >
              CFT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftcoinBalanceCard;