export const clientDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Format: "February 9, 2025"
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return `${formattedDate}`;
};