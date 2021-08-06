import { grey, red, deepPurple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const secondaryColor = {
  50: '#fcf9ff',
  100: '#f7f4ff',
  200: '#f1edf9',
  300: '#e3e0eb',
  400: '#c0bdc8',
  500: '#a19ea9',
  600: '#78757f',
  700: '#64616b',
  800: '#44424b',
  900: '#232129',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#26272d',
};

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
        img: {
          display: 'block',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
  },
  palette: {
    background: {
      paper: '#212126',
      default: '#121115',
    },
    primary: deepPurple,
    secondary: secondaryColor,
    error: red,
    divider: '#3a383e',
    text: {
      primary: grey[50],
      secondary: secondaryColor[600],
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(', '),
    h1: {
      fontSize: 36,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
    },
    h3: {
      fontSize: 28,
      fontWeight: 600,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
    },
    h5: {
      fontSize: 18,
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      fontWeight: 600,
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 1.2,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.5),0px 1px 3px 0px rgba(0,0,0,0.5)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.5),0px 1px 5px 0px rgba(0,0,0,0.5)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.5),0px 1px 8px 0px rgba(0,0,0,0.5)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.5),0px 1px 10px 0px rgba(0,0,0,0.5)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.5),0px 1px 14px 0px rgba(0,0,0,0.5)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.5),0px 1px 18px 0px rgba(0,0,0,0.5)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.5),0px 2px 16px 1px rgba(0,0,0,0.5)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.5),0px 3px 14px 2px rgba(0,0,0,0.5)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.5),0px 3px 16px 2px rgba(0,0,0,0.5)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.5),0px 4px 18px 3px rgba(0,0,0,0.5)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.5),0px 4px 20px 3px rgba(0,0,0,0.5)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.5),0px 5px 22px 4px rgba(0,0,0,0.5)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.5),0px 5px 24px 4px rgba(0,0,0,0.5)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.5),0px 5px 26px 4px rgba(0,0,0,0.5)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.5),0px 6px 28px 5px rgba(0,0,0,0.5)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.5),0px 6px 30px 5px rgba(0,0,0,0.5)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.5),0px 6px 32px 5px rgba(0,0,0,0.5)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.5),0px 7px 34px 6px rgba(0,0,0,0.5)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.5),0px 7px 36px 6px rgba(0,0,0,0.5)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.5),0px 8px 38px 7px rgba(0,0,0,0.5)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.5),0px 8px 40px 7px rgba(0,0,0,0.5)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.5),0px 8px 42px 7px rgba(0,0,0,0.5)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.5),0px 9px 44px 8px rgba(0,0,0,0.5)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.5),0px 9px 46px 8px rgba(0,0,0,0.5)',
  ],
});

export default theme;
