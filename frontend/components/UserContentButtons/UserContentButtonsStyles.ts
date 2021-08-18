import { makeStyles, Theme } from '@material-ui/core';

const useUserContentButtonsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 2,
    height: 55,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      flexDirection: 'column',
    },
  },
  button: {
    flex: '1 1',
    display: 'flex',
  },
}));

export default useUserContentButtonsStyles;
