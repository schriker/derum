import { makeStyles, Theme } from '@material-ui/core';

const useCommentsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useCommentsStyles;
