import { makeStyles, Theme } from '@material-ui/core';

const useSearchListStyles = makeStyles((theme: Theme) => ({
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.secondary[600],
    marginBottom: 10,
  },
  commentsAuthor: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useSearchListStyles;
