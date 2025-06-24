interface Links {
  name: string;
  href: string;
}

export const company: Links[] = [
  {
    name: "About",
    href: "",
  },
  {
    name: "Careers",
    href: "",
  },
  {
    name: "Support",
    href: "",
  },
  {
    name: "Privacy Policy",
    href: "",
  },
  {
    name: "Terms of Service",
    href: "",
  },
];

export const resources: Links[] = [
  {
    name: "FAQs",
    href: "",
  },
  {
    name: "Webinars",
    href: "",
  },
  {
    name: "Community Forum",
    href: "",
  },
];

export const clients: Links[] = [
  {
    name: "Find Artisan",
    href: "",
  },
  {
    name: "Post a Job",
    href: "",
  },
  {
    name: "Help Center",
    href: "",
  },
];

export const artisans: Links[] = [
  {
    name: "Create a Profile",
    href: "",
  },
  {
    name: "Artisan Resources",
    href: "",
  },
  {
    name: "Browse Job Listings",
    href: "",
  },
];

export const footerLinks = [
  { name: "For Clients", links: clients },
  { name: "For Artisans", links: artisans },
  { name: "Resources", links: resources },
  { name: "Company", links: company },
];

export const links = {
  register: "/register",
  verifyEmail: "/verifyEmail",
  browseJob: "/marketplace",
  submit: "/submit",
  message: "/message",
  resources: "/resources",
  applied: "/manage-jobs/artisans",
  active: "/manage-jobs/artisans/active",
  completed: "/manage-jobs/artisans/completed",
  disputed: "/manage-jobs/artisans/disputed",
  closed: "/manage-jobs/artisans/closed",
  opened: "/manage-jobs/clients",
  client_active: "/manage-jobs/clients/active",
  client_completed: "/manage-jobs/clients/completed",
  client_disputed: "/manage-jobs/clients/disputed",
  client_closed: "/manage-jobs/clients/closed",
  artisans_profile: "/profile/artisans",
  client_profile: "/profile/client"
};
