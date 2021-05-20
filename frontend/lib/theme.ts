import { grey, blue, red } from '@material-ui/core/colors';
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
        img: {
          display: 'block',
        },
      },
    },
  },
  palette: {
    background: {
      paper: '#1D1D1D',
      default: '#0B0B0B',
    },
    primary: blue,
    secondary: grey,
    error: red,
    divider: '#333436',
    text: {
      primary: grey[50],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(', '),
    h5: {
      fontSize: 18,
      fontWeight: 700,
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
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 3,
  },
});

export default theme;
