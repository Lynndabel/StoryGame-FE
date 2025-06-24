import React from 'react';
import Image from 'next/image';

interface AttachedLinksProps {
  contextLink?: string;
  additionalLinks?: string[]; // In case you want to support multiple links later
}

const AttachedLinks: React.FC<AttachedLinksProps> = ({ 
  contextLink, 
  additionalLinks = [] 
}) => {
  const allLinks = [
    ...(contextLink ? [contextLink] : []),
    ...additionalLinks
  ];

  if (allLinks.length === 0) {
    return null;
  }

  const formatLinkText = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url.length > 30 ? `${url.substring(0, 30)}...` : url;
    }
  };

  return (
    <div className="bg-[#F2E8CF0A] text-start rounded-lg w-full p-4 space-y-4">
      <p className="text-[#B5B4AD]">ATTACHED LINKS</p>
      
      <div className="space-y-3">
        {allLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-[#FCFBF726] rounded-lg hover:bg-[#26220826] transition-colors group"
          >
            <div className="w-8 h-8 bg-[#262208] rounded-lg flex items-center justify-center">
              <Image 
                src="/market/coin.svg" 
                alt="External Link" 
                width={16} 
                height={16} 
                className="text-[#FCF8E3]" 
              />
            </div>
            <div className="flex-1">
              <p className="text-[#D8D6CF] text-sm group-hover:text-[#FCF8E3] transition-colors">
                {formatLinkText(link)}
              </p>
              <p className="text-[#B5B4AD] text-xs">
                External Link
              </p>
            </div>
            <Image 
              src="/market/coin.svg" 
              alt="External Link" 
              width={14} 
              height={14} 
              className="text-[#B5B4AD] group-hover:text-[#FCF8E3] transition-colors" 
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default AttachedLinks;