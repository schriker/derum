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
}));

export default useChatInputQuickBarStyles;
