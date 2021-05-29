import { makeStyles, Theme } from '@material-ui/core';

const useHeaderStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  photo: {
    height: 50,
    width: 50,
  },
  content: {
    marginLeft: theme.spacing(2),
    wordBreak: 'break-all',
  },
}));

export default useHeaderStyles;
