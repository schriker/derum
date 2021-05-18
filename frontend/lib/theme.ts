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
  },
  shape: {
    borderRadius: 3,
  },
});

export default theme;
