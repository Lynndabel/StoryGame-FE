import { ArtisanProfileProps, AboutProps, DetailsProps, PortfolioProps, WorkHistory } from '@/utils/profile';

export const transformBackendProfileData = (
  fetchedData: {
    artisanCategory: string | undefined;
    skills: string[] | undefined;
    experienceLevel: string | undefined;
    preferredLanguages: string[] | undefined;
    yearsOfPractice: number | undefined;
    serviceTagline: string | undefined;
    bio: string | undefined;
    rate: number | undefined;
    availableForProjects: boolean | undefined;
    avatar: string | undefined;
    whProjectTitle: string[] | undefined;
    whDescription: string[] | undefined;
    whDuration: string[] | undefined;
    whMediaUrls: string[] | undefined;
    portfolio?: Array<{
      projectTitle: string;
      description: string;
      projectDuration: { weeks: number } | undefined;
      files?: Array<{ url: string }>;

      id: string;
    }> | undefined;
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
    title: fetchedData.serviceTagline || "No tagline provided",
    desc: fetchedData.bio || "No bio provided",
    username: detail?.username || "Anonymous",
    jobTitle: fetchedData.artisanCategory || "Unspecified Role",
  };

  // Transform Details section
  const details: DetailsProps = {
    language: Array.isArray(fetchedData.preferredLanguages) ? fetchedData.preferredLanguages.join(', ') : fetchedData.preferredLanguages || "Not specified",
    location: detail?.location ?? "Not specified",
    experience: `${fetchedData.experienceLevel ?? "Not specified"}/${fetchedData.yearsOfPractice ?? "0"} years`,
    availability: fetchedData.availableForProjects ?? "Not specified",
    pricing: fetchedData.rate ?? 0,
    walletAddress: address,
    amountEarned: undefined,
    rating: undefined,
    tagline: fetchedData.serviceTagline ?? ""
  };

  // Transform Portfolio section
  const portfolio: PortfolioProps[] = fetchedData.portfolio?.map((item, index) => ({
    id: index + 1,
    imgSrc: item.files ? item.files.map(f => f.url) : ["/client-artisan.png"], // Use files, not simplified_files
    title: item.projectTitle,
    desc: item.description,
    duration: item.projectDuration ? `${item.projectDuration.weeks} weeks` : "Not specified",
  })) || [];

  // Transform Work History
  const works: WorkHistory[] = fetchedData.whProjectTitle?.map((title, index) => ({
    title: title,
    detail: (fetchedData.whDescription && fetchedData.whDescription[index]) || "",
    start: (fetchedData.whDuration && fetchedData.whDuration[index]?.split("-")[0]) || "",
    end: (fetchedData.whDuration && fetchedData.whDuration[index]?.split("-")[1]) || "",
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