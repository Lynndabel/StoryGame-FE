// Project Structure
/*
story-platform-frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── story/
│   │   │   ├── StoryCard.tsx
│   │   │   ├── StoryList.tsx
│   │   │   ├── StoryDetail.tsx
│   │   │   ├── ChapterCard.tsx
│   │   │   ├── ChapterList.tsx
│   │   │   └── CreateStoryForm.tsx
│   │   ├── voting/
│   │   │   ├── ProposalCard.tsx
│   │   │   ├── VotingInterface.tsx
│   │   │   ├── VotingResults.tsx
│   │   │   └── CreateProposalForm.tsx
│   │   ├── user/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── UserStats.tsx
│   │   │   └── UserProfile.tsx
│   │   └── common/
│   │       ├── SearchBar.tsx
│   │       ├── Pagination.tsx
│   │       └── FilterTabs.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── stories/
│   │   │   ├── index.tsx
│   │   │   ├── [id].tsx
│   │   │   └── create.tsx
│   │   ├── voting/
│   │   │   └── index.tsx
│   │   ├── profile/
│   │   │   └── index.tsx
│   │   └── _app.tsx
│   ├── utils/
│   │   ├── web3/
│   │   │   ├── contracts.ts
│   │   │   ├── provider.ts
│   │   │   └── helpers.ts
│   │   ├── api/
│   │   │   ├── stories.ts
│   │   │   ├── chapters.ts
│   │   │   ├── voting.ts
│   │   │   └── users.ts
│   │   ├── helpers/
│   │   │   ├── formatters.ts
│   │   │   ├── constants.ts
│   │   │   └── validators.ts
│   │   └── hooks/
│   │       ├── useWeb3.ts
│   │       ├── useStories.ts
│   │       ├── useVoting.ts
│   │       └── useAuth.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   ├── story.ts
│   │   ├── user.ts
│   │   ├── voting.ts
│   │   └── index.ts
│   └── context/
│       ├── Web3Context.tsx
│       ├── AuthContext.tsx
│       └── ThemeContext.tsx
├── public/
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
*/

// package.json
{
  "name": "story-platform-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "axios": "^1.6.0",
    "react-icons": "^4.12.0",
    "ethers": "^6.8.0",
    "wagmi": "^1.4.0",
    "@wagmi/core": "^1.4.0",
    "viem": "^1.19.0",
    "@rainbow-me/rainbowkit": "^1.3.0",
    "framer-motion": "^10.16.0",
    "react-hot-toast": "^2.4.0",
    "date-fns": "^2.30.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "@tailwindcss/forms": "^0.5.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'web3-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'story-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'vote-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ipfs.io',
      'gateway.pinata.cloud',
      'cloudflare-ipfs.com',
    ],
  },
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/utils/hooks/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}