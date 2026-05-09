// Theme System - Modern Design with Light/Dark Mode

export type ThemeMode = 'light' | 'dark';

export interface Colors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: Colors;
  effects: {
    backgroundGradient: string;
    floatingSurface: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    small: string;
  };
}

const lightColors: Colors = {
  primary: '#0EA5E9',
  secondary: '#14B8A6',
  success: '#16A34A',
  warning: '#D97706',
  danger: '#DC2626',
  background: '#F7FBFF',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#475569',
  border: '#D8E5F5',
  shadow: 'rgba(15, 23, 42, 0.10)',
};

const darkColors: Colors = {
  primary: '#38BDF8',
  secondary: '#2DD4BF',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#F87171',
  background: '#0B1220',
  surface: '#111D30',
  text: '#E2E8F0',
  textSecondary: '#94A3B8',
  border: '#1E2F4A',
  shadow: 'rgba(2, 6, 23, 0.45)',
};

const lightEffects = {
  backgroundGradient:
    'radial-gradient(1100px 420px at -12% -12%, rgba(14,165,233,0.20) 0%, rgba(14,165,233,0) 55%), radial-gradient(1000px 430px at 110% 0%, rgba(20,184,166,0.20) 0%, rgba(20,184,166,0) 58%), linear-gradient(180deg, #F7FBFF 0%, #ECF5FF 100%)',
  floatingSurface: 'rgba(255, 255, 255, 0.82)',
};

const darkEffects = {
  backgroundGradient:
    'radial-gradient(1100px 420px at -12% -12%, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0) 55%), radial-gradient(1000px 430px at 110% 0%, rgba(45,212,191,0.16) 0%, rgba(45,212,191,0) 58%), linear-gradient(180deg, #0B1220 0%, #0A1627 100%)',
  floatingSurface: 'rgba(11, 18, 32, 0.78)',
};

const spacing = {
  xs: '6px',
  sm: '10px',
  md: '16px',
  lg: '24px',
  xl: '36px',
};

const borderRadius = {
  sm: '10px',
  md: '14px',
  lg: '20px',
};

const typography = {
  h1: 'clamp(2rem, 3vw + 1rem, 3.1rem)',
  h2: 'clamp(1.4rem, 1.5vw + 1rem, 2rem)',
  h3: '1.2rem',
  body: '1rem',
  small: '0.875rem',
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  effects: lightEffects,
  spacing,
  borderRadius,
  typography,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  effects: darkEffects,
  spacing,
  borderRadius,
  typography,
};

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
