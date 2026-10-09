/**
 * Format date to relative time (e.g., "2 hours ago", "3 days ago")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const noteDate = new Date(date);
  const diffInSeconds = Math.floor((now - noteDate) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format date to readable format (e.g., "Jan 15, 2024 at 2:30 PM")
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Count words in text
 */
export const countWords = (text) => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Count characters in text
 */
export const countCharacters = (text) => {
  return text.length;
};

/**
 * Get category color
 */
export const getCategoryColor = (category) => {
  const colors = {
    Study: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Work: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Ideas: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Projects: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[category] || colors.Personal;
};
