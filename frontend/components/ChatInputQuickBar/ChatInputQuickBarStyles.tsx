import { makeStyles, Theme } from '@material-ui/core';

const useChatInputQuickBarStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: 2,
    padding: 5,
  },
  user: {
    padding: '5px',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
    '& img': {
      margin: '0 auto',
    },
  },
  active: {
    backgroundColor: theme.palette.grey[800],
  },
}));

export default useChatInputQuickBarStyles;
