export const CATEGORIES = [
  { value: 'Study', label: 'Study', color: '#3b82f6' },
  { value: 'Work', label: 'Work', color: '#8b5cf6' },
  { value: 'Personal', label: 'Personal', color: '#10b981' },
  { value: 'Ideas', label: 'Ideas', color: '#f59e0b' },
  { value: 'Projects', label: 'Projects', color: '#ef4444' },
];

export const NOTE_COLORS = [
  { name: 'Lavender', value: '#e9d5ff' },
  { name: 'Pink Blush', value: '#fce7f3' },
  { name: 'Peach', value: '#fed7aa' },
  { name: 'Mint', value: '#d1fae5' },
  { name: 'Sky Blue', value: '#dbeafe' },
  { name: 'Lemon', value: '#fef3c7' },
  { name: 'Rose', value: '#ffe4e6' },
  { name: 'Coral', value: '#fecaca' },
  { name: 'Aqua', value: '#ccfbf1' },
  { name: 'Lilac', value: '#f3e8ff' },
  { name: 'Cream', value: '#fef9c3' },
  { name: 'Blush', value: '#fbcfe8' },
];

// Function to get a random note color
export const getRandomNoteColor = () => {
  const randomIndex = Math.floor(Math.random() * NOTE_COLORS.length);
  return NOTE_COLORS[randomIndex].value;
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NOTES: '/notes',
  NOTE_DETAIL: '/notes/:id',
  PINNED: '/pinned',
  FAVORITES: '/favorites',
  ARCHIVED: '/archived',
};
