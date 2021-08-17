import { makeStyles, Theme } from '@material-ui/core';

const useChatStyles = makeStyles((theme: Theme) => ({
  paper: {
    flexDirection: 'initial',
    height: 'calc(100vh - 60px)',
    backgroundColor: theme.palette.background.default,
  },
}));

export default useChatStyles;
