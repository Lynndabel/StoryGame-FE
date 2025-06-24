import { suggestedSkillsArray } from "./skills";

export interface AccountCard {
  type: string;
  image: string;
  profilePage: string;
}
export interface AboutProps {
  avatar: string;
  title: string;
  desc: string;
  username: string;
  jobTitle: string;
}

export interface ProfileProps {
  avatar: string;
  username: string;
  category: string;
  location: string;
}
export interface ClientProps {
  avatar: string;
  username: string;
  language: string;
  location: string;
}

export interface PortfolioProps {
  id?: number;
  imgSrc: string[];
  duration: string;
  title: string;
  desc: string;
}


export interface DetailsProps {
  language: string;
  location: string;
  experience: string;
  availability: boolean | string;
  pricing: number;
  walletAddress: string;
  amountEarned?: number;
  rating?: number;
  tagline: string;
  yearOfExperience?: number;
}

export interface ReviewsProp {
  id: number;
  reviewer: string;
  review: string;
  rating: number;
}

export interface WorkHistory {
  title: string;
  detail: string;
  start: string;
  end: string;
}

export interface ArtisanProfileProps {
  about: AboutProps;
  skills: string[];
  details: DetailsProps;
  portfolio: PortfolioProps[];
  reviews: ReviewsProp[];
  works?: WorkHistory[];
}

const dummyAbout: AboutProps = {
  avatar: "/avatar.png",
  title: "Decentralized Fashion Design for the Modern Web3 Creator.",
  desc: "As an experienced fashion designer in Nigeria, I specialize in creating unique garments that blend style, comfort, and individuality. My passion lies in tailoring pieces that reflect the personality and preferences of my clients, ensuring each creation is as distinctive as the wearer.  In addition to my physical designs,  I also delve into the world of digital fashion, crafting virtual clothing that can be used in online environments and avatars. This innovative approach allows me to explore new creativity while keeping sustainability at the forefront of my work, whether for real-world applications or the digital realm.",
  username: "PROTOBLACK",
  jobTitle: "Fashion Designer",
};

export const editProfile: ProfileProps = {
  avatar: "/avatar.png",
  category: "Fashion",
  username: "PROTOBLACK",
  location: "Lagos, Nigeria",
};


const dummyDetails: DetailsProps = {
  language: "English",
  location: "Nigeria",
  experience: "Intermediate/3years",
  availability: "Available to work",
  pricing: 200,
  amountEarned: 500,
  rating: 4.5,
  walletAddress: "0x1286eefgegvsbj73yop3hne",
  tagline: "Decentralized Fashion Design for the Modern Web3 Creator.",
};

const dummyPortfolio: PortfolioProps[] = [
  {
    imgSrc: ["/elegant-dress.png"],
    title: "Elegant Evening Dress",
    desc: "This bespoke evening gown combines classic design with modern elegance, crafted from premium satin and adorned with intr...",
    duration: "4 weeks",
  },
  {
    imgSrc: ["/elegant-dress.png"],
    title: "Elegant Evening Dress",
    desc: "This bespoke evening gown combines classic design with modern elegance, crafted from premium satin and adorned with intr...",
    duration: "4 weeks",
  },
  {
    imgSrc: ["/elegant-dress.png"],
    title: "Elegant Evening Dress",
    desc: "This bespoke evening gown combines classic design with modern elegance, crafted from premium satin and adorned with intr...",
    duration: "4 weeks",
  },
];

const dummyReviews: ReviewsProp[] = [
  {
    id: 1,
    reviewer: "Tolu A.",
    review:
      "I commissioned #Protoblack for a bespoke suit, and the result was amazing. They were professional and patient, ensuring the design matched my vision. My only feedback would be to improve delivery time slightly, but overall, the craftsmanship was worth the wait!",
    rating: 3,
  },
  {
    id: 2,
    reviewer: "Tolu A.",
    review:
      "I commissioned #Protoblack for a bespoke suit, and the result was amazing. They were professional and patient, ensuring the design matched my vision. My only feedback would be to improve delivery time slightly, but overall, the craftsmanship was worth the wait!",
    rating: 3,
  },
];

const dummyWorkHistory: WorkHistory[] = [
  {
    title: "Freelance Fashion Designer, CraftLink",
    detail:
      "Collaborated with luxury brands to design capsule collections featured in international fashion weeks.",
    start: "2024",
    end: "2024",
  },
  {
    title: "Assistant Designer, Fitage",
    detail:
      "Developed ready-to-wear lines under the creative direction of industry leaders.",
    start: "2020",
    end: "2024",
  },
];

export const dummyProfile: ArtisanProfileProps = {
  about: dummyAbout,
  skills: suggestedSkillsArray,
  details: dummyDetails,
  portfolio: dummyPortfolio,
  reviews: dummyReviews,
  works: dummyWorkHistory,
};

export const userCard: AccountCard = {
  type: "artisan",
  image: "/profile.png",
  profilePage: "/profile/artisans",
};
