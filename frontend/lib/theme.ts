import { green, indigo, grey, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

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
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '30px',
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
      default: '#FAFAFA',
    },
    primary: indigo,
    secondary: green,
    error: red,
    divider: '#ECECEC',
    action: {
      hover: '#FAFAFA',
    },
    text: {
      primary: grey[700],
      secondary: green[700],
    },
  },
  typography: {
    fontFamily: ['Arimo', 'sans-serif'].join(', '),
    h5: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 3,
  },
  shadows: [
    'none',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 4px 0px rgba(0,0,0,0.25)',
    '0px 2px 6px 0px rgba(0,0,0,0.20)',
    '0px 2px 8px 0px rgba(0,0,0,0.15)',
    '0px 2px 10px 0px rgba(0,0,0,0.10)',
    '0px 2px 2px 0px rgba(0,0,0,0.08)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
    '0px 2px 2px 0px rgba(0,0,0,0.25)',
  ],
});

export default theme;
