import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    ipfsUrl: string;
    setIpfsUrl: (url: string) => void;
}

export const useStoreIPFS = create(
    persist<State>(
        (set) => ({
            ipfsUrl: "",
            setIpfsUrl: (url) => set({ ipfsUrl: url }),
        }),
        {
            name: "ipfs-url",
        }
    )
);

interface WorkHistoryItem {
  projectTitle: string;
  description: string;
  duration: string;
  mediaUrls: string[]; // Array of URLs pointing to uploaded media files
}

interface userRole {
  role: string;
  setRole: (role: string) => void;
}

export const useGetUserRole = create<userRole>()(
    persist(
        (set) => ({
            role: "",
            setRole: (role) => set({ role: role }),
        }),
        {
            name: "user-role",
        }
    )
);

interface artisanData {
  category: string;
  skills: string[];
  experienceLevel: string;
  preferredLanguage: string;
  yearsOfExperience: number;
  tagline: string;
  bio: string;
  rate: number;
  availability: boolean;
  avatar: string;
  workHistory: WorkHistoryItem[];
  setCategory: (category: string) => void;
  setSelectedSkills: (skills: string) => void;
  setExperienceLevel: (level: string) => void;
  setPreferredLanguage: (language: string) => void;
  setYearsOfExperience: (years: number) => void;
  setTagline: (tagline: string) => void;
  setBio: (bio: string) => void;
  setRate: (rate: number) => void;
  setAvailability: (availability: boolean) => void;
  setAvatar: (avatar: string) => void;
  addWorkHistoryItem: (item: WorkHistoryItem) => void;
  updateWorkHistoryItem: (index: number, item: WorkHistoryItem) => void;
  removeWorkHistoryItem: (index: number) => void;
}

export const useGetArtisanData = create<artisanData>()(
    persist(
        (set) => ({
            category: "",
            skills: [],
            experienceLevel: "",
            preferredLanguage: "",
            yearsOfExperience: 0,
            tagline: "",
            bio: "",
            rate: 1,
            availability: false,
            avatar: "",
            workHistory: [],
            setCategory: (category) => set({ category: category }),
            setSelectedSkills: (skill) =>
                set((state) => {
                    const alreadySelected = state.skills.some((s) => s === skill);

                    return {
                        skills: alreadySelected
                            ? state.skills.filter((s) => s !== skill)
                            : [...state.skills, skill],
                    };
                }),
            setExperienceLevel: (level) => set({ experienceLevel: level }),
            setPreferredLanguage: (language) => set({ preferredLanguage: language }),
            setYearsOfExperience: (years) => set({ yearsOfExperience: years }),
            setTagline: (tagline) => set({ tagline: tagline }),
            setBio: (bio) => set({ bio: bio }),
            setRate: (rate) => set({ rate: rate }),
            setAvailability: (availability) => set({ availability: availability }),
            setAvatar: (avatar) => set({ avatar: avatar }),
            addWorkHistoryItem: (item) => set((state) => ({
              workHistory: [...state.workHistory, item]
            })),
            updateWorkHistoryItem: (index, item) => set((state) => {
              const workHistory = [...state.workHistory];
              workHistory[index] = item;
              return { workHistory };
            }),
            removeWorkHistoryItem: (index) => set((state) => ({
              workHistory: state.workHistory.filter((_, i) => i !== index)
            })),   
        }),
        {
            name: "new-artisan-data",
        }
    )
);

interface clientData {
  username: string;
  location: string;
  clientBio: string;
  clientAvatar: string;
  preferredLanguage: string;
  joined: string;
  setUsername: (username: string) => void;
  setLocation: (location: string) => void;
  setClientBio: (bio: string) => void;
  setClientAvatar: (avatar: string) => void;
  setPreferredLanguage: (language: string) => void;
  setJoined: (joined: string) => void;
}

export const useGetClientData = create<clientData>()(
  persist(
    (set) => ({
      username: "",
      location: "",
      clientBio: "",
      clientAvatar: "",
      preferredLanguage: "",
      joined: "",
      setUsername: (username) => set({ username: username }),
      setLocation: (location) => set({ location: location }),
      setClientBio: (bio) => set({ clientBio: bio }),
      setClientAvatar: (avatar) => set({ clientAvatar: avatar }),
      setPreferredLanguage: (language) => set({ preferredLanguage: language }),
      setJoined: (joined) => set({ joined: joined }),
    }),
    {
      name: "new-client-data",
    }
  )
);

interface JobData {
  jobTitle: string;
  experienceRequired: string;
  jobMediaUrls: string[];
  jobContextLink: string;
  additionalInfo: string;
  jobDescription: string;
  amount: number;
  duration: number;
  requiredSkills: string[];
  jobLocation: string;
  setJobTitle: (title: string) => void;
  setJobDescription: (description: string) => void;
  setJobLocation: (location: string) => void;
  setAmount: (amount: number) => void;
  setDuration: (duration: number) => void;
  setExperienceRequired: (experience: string) => void;
  setJobMediaUrls: (urls: string[]) => void;
  setJobContextLink: (link: string) => void;
  setAdditionalInfo: (info: string) => void;
  setRequiredSkills: (skills: string[]) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

export const useGetJobData = create<JobData>()(
  persist(
    (set) => ({
      // Initial state
      jobTitle: "",
      experienceRequired: "",
      jobMediaUrls: [],
      jobContextLink: "",
      additionalInfo: "",
      jobDescription: "",
      amount: 0,
      duration: 0,
      requiredSkills: [],
      jobLocation: "",

      // Actions
      setJobTitle: (title) => set({ jobTitle: title }),
      setJobDescription: (description) => set({ jobDescription: description }),
      setJobLocation: (location) => set({ jobLocation: location }),
      setAmount: (amount) => set({ amount: amount }),
      setDuration: (duration) => set({ duration: duration }),
      setExperienceRequired: (experience) => set({ experienceRequired: experience }),
      setJobMediaUrls: (urls) => set({ jobMediaUrls: urls }),
      setJobContextLink: (link) => set({ jobContextLink: link }),
      setAdditionalInfo: (info) => set({ additionalInfo: info }),
      setRequiredSkills: (skills) => set({ requiredSkills: skills }),
      addSkill: (skill) => 
        set((state) => ({
          requiredSkills: state.requiredSkills.includes(skill)
            ? state.requiredSkills
            : [...state.requiredSkills, skill]
        })),
      removeSkill: (skill) => 
        set((state) => ({
          requiredSkills: state.requiredSkills.filter((s) => s !== skill)
        }))
    }),
    {
      name: "job-data"
    }
  )
);