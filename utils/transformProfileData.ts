import {
  ArtisanProfileProps,
  AboutProps,
  DetailsProps,
  PortfolioProps,
  WorkHistory,
} from "@/utils/profile";

interface WorkHistoryItem {
  projectTitle: string;
  description: string;
  duration: string;
  mediaUrls: string[];
}

export const transformProfileData = (
  fetchedData: {
    category: string | undefined;
    skills: string[] | undefined;
    experienceLevel: string | undefined;
    preferredLanguage: string | undefined;
    yearsOfExperience: number | undefined;
    tagline: string;
    bio: string | undefined;
    rate: number | undefined;
    availability: boolean | undefined;
    avatar: string | undefined;
    workHistory: WorkHistoryItem[] | undefined;
  },
  detail: {
    username: string;
    location: string;
  } | null,
  address: string
): ArtisanProfileProps => {
  // Transform About section
  const about: AboutProps = {
    avatar: fetchedData.avatar || "/avatar.png",
    title: fetchedData.tagline || "No tagline provided",
    desc: fetchedData.bio || "No bio provided",
    username: detail?.username || "Anonymous",
    jobTitle: fetchedData.category || "Unspecified Role",
  };

  // Transform Details section
  const details: DetailsProps = {
    language: fetchedData.preferredLanguage || "Not specified",
    location: detail?.location || "Not specified",
    experience: `${fetchedData.experienceLevel || "Not specified"}/${
      fetchedData.yearsOfExperience || "0"
    } years`,
    availability: fetchedData.availability ? "Available" : "Not Available", // Adjusted to boolean check
    pricing: fetchedData.rate || 0,
    walletAddress: address,
    amountEarned: undefined,
    rating: undefined,
    tagline: fetchedData.tagline,
  };

  // Transform Portfolio section
  const portfolio: PortfolioProps[] =
    fetchedData.workHistory?.map((item, index) => ({
      id: index + 1,
      imgSrc: item.mediaUrls || ["/elegant-dress.png"], // Use the first media URL or a default
      title: item.projectTitle,
      desc: item.description,
      duration: item.duration,
    })) || [];

  // Transform Work History
  const works: WorkHistory[] =
    fetchedData.workHistory?.map((item) => ({
      title: item.projectTitle,
      detail: item.description,
      start: item.duration.split("-")[0] || "",
      end: item.duration.split("-")[1] || "",
    })) || [];

  return {
    about,
    skills: fetchedData.skills || [],
    details,
    portfolio,
    works,
    reviews: [], // Initialize empty as reviews data isn't available in the fetch
  };
};
