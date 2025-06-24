"use client";
import React from 'react';
import Image from 'next/image';

interface AttachedLink {
  id: string;
  title: string;
  url: string;
  description?: string;
}

interface AttachedLinksProps {
  links?: string[] | AttachedLink[];
  contextLink?: string;
}

const AttachedLinks: React.FC<AttachedLinksProps> = ({ links, contextLink }) => {
  // Combine all links
  const allLinks: (string | AttachedLink)[] = [
    ...(contextLink ? [contextLink] : []),
    ...(links || [])
  ];

  if (allLinks.length === 0) {
    return (
      <div className="text-[#B5B4AD] text-sm italic">
        No links attached
      </div>
    );
  }

  const formatLinkDisplay = (url: string) => {
    try {
      const urlObj = new URL(url);
      return {
        domain: urlObj.hostname.replace('www.', ''),
        title: urlObj.hostname.replace('www.', ''),
        description: 'External Link'
      };
    } catch {
      return {
        domain: url.length > 30 ? `${url.substring(0, 30)}...` : url,
        title: url.length > 30 ? `${url.substring(0, 30)}...` : url,
        description: 'Link'
      };
    }
  };

  const renderLink = (link: string | AttachedLink, index: number) => {
    let linkData: AttachedLink;
    
    if (typeof link === 'string') {
      const display = formatLinkDisplay(link);
      linkData = {
        id: `link-${index}`,
        title: display.title,
        url: link,
        description: display.description
      };
    } else {
      linkData = link;
    }

    return (
      <a
        key={`link-${linkData.id}-${index}`}
        href={linkData.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 border border-[#FCFBF726] rounded-lg hover:bg-[#26220826] transition-colors group w-full"
      >
        <div className="w-8 h-8 bg-[#262208] rounded-lg flex items-center justify-center flex-shrink-0">
          <Image 
            src="/market/coin.svg" 
            alt="External Link" 
            width={16} 
            height={16} 
            className="text-[#FCF8E3]" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#D8D6CF] text-sm group-hover:text-[#FCF8E3] transition-colors truncate">
            {linkData.title}
          </p>
          {linkData.description && (
            <p className="text-[#B5B4AD] text-xs">
              {linkData.description}
            </p>
          )}
        </div>
        <Image 
          src="/market/coin.svg" 
          alt="External Link" 
          width={14} 
          height={14} 
          className="text-[#B5B4AD] group-hover:text-[#FCF8E3] transition-colors flex-shrink-0" 
        />
      </a>
    );
  };

  return (
    <div className="space-y-3">
      {allLinks.map((link, index) => renderLink(link, index))}
    </div>
  );
};

export default AttachedLinks;