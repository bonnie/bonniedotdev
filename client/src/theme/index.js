import { createMuiTheme } from '@material-ui/core/styles';
// import { white } from '@material-ui/core/colors';

export const colors = {
  darkBlue: '#061942',
  lighterDarkBlue: '#1D345E',
  darkTeal: '#25557A',
  lightTeal: '#5594B7',
  mediumTeal: '#4781A5',
  darkGrey: '#1A2838',
  lightGrey: '#B1B1B5',
  transparentDarkGrey: 'rgba(0, 0, 0, 0.7)',
};

const rawTheme = createMuiTheme({
  palette: {
    background: {
      main: colors.darkGrey,
    },
    primary: {
      // font color against image background
      main: colors.darkGrey,
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

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: 'uppercase',
};

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
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
      fontWeight: 700,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
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
