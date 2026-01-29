// Color Palette
export const Colors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  success: '#7BED9F',

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(0, 0, 0, 0.3)',
    accent: 'rgba(255, 107, 107, 0.4)',
    darkOverlay: 'rgba(15, 15, 15, 0.7)',
  },

  // Backgrounds
  background: {
    light: {
      primary: '#f8f9fa',
      secondary: '#e9ecef',
    },
    dark: {
      primary: '#1a1a2e',
      secondary: '#16213e',
    },
  },

  // Text
  text: {
    light: {
      primary: '#1a1a1a',
      secondary: '#6c757d',
    },
    dark: {
      primary: '#ffffff',
      secondary: '#adb5bd',
    },
  },

  // Border
  border: {
    light: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(255, 255, 255, 0.1)',
  },

  // Action Colors
  like: '#7BED9F',
  pass: '#adb5bd',
  superLike: '#FFE66D',
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Typography
export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
};

// Animation Durations
export const Durations = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Screen Dimensions
export const Layout = {
  window: {
    width: 0, // Will be set dynamically
    height: 0, // Will be set dynamically
  },
  isSmallDevice: false, // Will be set dynamically
};
