import { makeStyles, Theme } from '@material-ui/core';

const useSearchListStyles = makeStyles((theme: Theme) => ({
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    borderRadius: 0,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 10,
    fontWeight: 500,
  },
  sectionTitle: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: theme.palette.secondary[600],
    marginBottom: 10,
  },
}));

export default useSearchListStyles;
