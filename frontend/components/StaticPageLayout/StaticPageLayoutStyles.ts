import { makeStyles, Theme } from '@material-ui/core';

const useStaticPageLayoutStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: 30,
    alignItems: 'flex-start',
    overflow: 'auto',
  },
  content: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

export default useStaticPageLayoutStyles;
