import { makeStyles, Theme } from '@material-ui/core';

const useChatStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    flexDirection: 'initial',
    backgroundColor: theme.palette.background.default,
  },
  wrapper: {
    display: 'flex',
    position: 'fixed',
    inset: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    right: 14,
    bottom: 65,
    zIndex: 9999,
  },
}));

export default useChatStyles;
