export const formatDate = (dateString: string | null | undefined): string => {
  // Return a fallback string if dateString is null/undefined
  if (!dateString) {
    return `${dateString}`;
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${dateString}`);
    return `${dateString}`;
  }

  try {
    // Format: "February 9, 2025"
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Add time with AM/PM
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return `${dateString}`;
  }
};

// Helper function to validate date string format
export const isValidDateString = (dateString: string): boolean => {
  if (!dateString) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Helper function to get current date in ISO format
export const getCurrentISODate = (): string => {
  return new Date().toISOString();
};

// Helper function to format relative time (e.g., "2 hours ago")
export const getRelativeTime = (dateString: string): string => {
  if (!isValidDateString(dateString)) {
    return `${dateString}`;
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return formatDate(dateString);
  }
};
