import { makeStyles, Theme } from '@material-ui/core';

const useNewPasswordFormStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  content: {
    maxWidth: 600,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default useNewPasswordFormStyles;
