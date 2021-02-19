import { createMuiTheme } from '@material-ui/core/styles';
// import { white } from '@material-ui/core/colors';

export const colors = {
  darkBlue: '#061942',
  lighterDarkBlue: '#1D345E',
  darkTeal: '#25557A',
  lightTeal: '#5594B7',
  mediumTeal: '#4781A5',
  darkGrey: '#1A2838',
  lightGrey: '#E0E0E0',
  white: '#FFFFFF',
  transparentDarkGrey: 'rgba(0, 0, 0, 0.7)',
  transparentLightGrey: 'rgba(250, 250, 250, 0.8)',
};

const rawTheme = createMuiTheme({
  palette: {
    background: {
      main: colors.transparentLightGrey,
      dark: colors.transparentDarkGrey,
    },
    primary: {
      light: colors.white,
      main: colors.darkGrey,
      contrastText: colors.darkTeal,
    },
    secondary: {
      // color font for contrast
      main: colors.mediumTeal,
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      main: '#F56866',
    },
    success: {
      main: '#69E065',
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    subtitle1: {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed  },
    },
  },
});

// const fontHeader = {
//   color: rawTheme.palette.text.primary,
//   fontWeight: rawTheme.typography.fontWeightMedium,
//   fontFamily: rawTheme.typography.fontFamilySecondary,
//   textTransform: 'uppercase',
// };

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      // default: rawTheme.palette.common.white,
      placeholder: colors.lightGrey,
    },
  },
  breakpoints: {
    ...rawTheme.breakpoints,
    values: {
      xs: 0,
      sm: 600,
      md: 700,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    ...rawTheme.typography,
    h1: {
      ...rawTheme.typography.h1,
      letterSpacing: 0,
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      ...rawTheme.typography.h2,
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      ...rawTheme.typography.h3,
      fontSize: 24,
      fontWeight: 600,
    },
    h4: {
      ...rawTheme.typography.h4,
      fontSize: 20,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 18,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      fontSize: 16,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
