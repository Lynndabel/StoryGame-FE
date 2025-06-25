// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { 
  FiTwitter, 
  FiGithub, 
  FiMail, 
  FiExternalLink 
} from 'react-icons/fi';
import { MdAutoStories } from 'react-icons/md';

export const Footer: React.FC = () => {
  const footerLinks = {
    Platform: [
      { label: 'How it Works', href: '/how-it-works' },
      { label: 'Tokenomics', href: '/tokenomics' },
      { label: 'Governance', href: '/governance' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    Community: [
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Twitter', href: 'https://x.com' },
      { label: 'Blog', href: '/blog' },
      { label: 'Forum', href: '/forum' },
    ],
    Resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Smart Contracts', href: '/contracts' },
      { label: 'Bug Bounty', href: '/security' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { icon: FiTwitter, href: 'https://twitter.com/storydao', label: 'Twitter' },
    { icon: FiGithub, href: 'https://github.com/storydao', label: 'GitHub' },
    { icon: FiMail, href: 'mailto:hello@storydao.xyz', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <MdAutoStories className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                StoryDAO
              </span>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              The first decentralized platform for collaborative storytelling. 
              Create, vote, and earn from community-driven narratives on the blockchain.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-primary-500 rounded-lg transition-all duration-200 group"
                >
                  <social.icon className="w-4 h-4 text-dark-400 group-hover:text-primary-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-dark-300 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      {link.href.startsWith('http') && (
                        <FiExternalLink className="w-3 h-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-dark-400 text-sm">
            © 2024 StoryDAO. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-dark-400">
              Built on 
              <span className="text-primary-400 font-medium ml-1">Arbitrum</span>
            </div>
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
            <div className="text-dark-400">
              Network Status: 
              <span className="text-accent-400 font-medium ml-1">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

