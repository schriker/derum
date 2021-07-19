import { makeStyles, Theme } from '@material-ui/core';

const useEmailLoginFormStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: theme.spacing(4),
  },
  divider: {
    position: 'relative',
  },
  or: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: '0 10px',
    transform: 'translate(-50%, -50%)',
  },
}));

export default useEmailLoginFormStyles;
