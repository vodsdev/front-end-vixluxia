// Application Configuration
export const APP_CONFIG = {
  name: '21st Clone',
  description: 'A community-driven registry of high-quality React UI components',
  version: '1.0.0',
  author: 'Vixluxia Team',
  
  // UI Configuration
  ui: {
    sidebarWidth: '16rem',
    sidebarWidthMobile: '18rem',
    headerHeight: '3.5rem',
    borderRadius: '0.5rem',
  },

  // Theme Configuration
  theme: {
    defaultMode: 'system', // 'light' | 'dark' | 'system'
    storageKey: 'vixluxia-theme',
  },

  // Component Grid Configuration
  grid: {
    columnsDesktop: 3,
    columnsTablet: 2,
    columnsMobile: 1,
    gap: 24, // in pixels
  },

  // Pagination Configuration
  pagination: {
    itemsPerPage: 12,
    maxPages: 10,
  },

  // API Configuration (for future use)
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },

  // Feature Flags
  features: {
    enableSearch: true,
    enableFilters: true,
    enableLikes: true,
    enableComments: false,
    enableUserProfiles: false,
  },

  // Links
  links: {
    github: 'https://github.com/serafimcloud/21st',
    discord: 'https://discord.gg/Qx4rFunHfm',
    twitter: 'https://x.com/serafimcloud',
    docs: 'https://21st.dev',
  },
};

export default APP_CONFIG;
