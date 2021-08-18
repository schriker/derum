import { makeStyles, Theme } from '@material-ui/core';

const useStaticPageLayoutStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    wordBreak: 'break-word',
    padding: 30,
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  content: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
}));

export default useStaticPageLayoutStyles;
