import { makeStyles, Theme } from '@material-ui/core';

const useEntriesItemStyle = makeStyles((theme: Theme) => ({
  content: {
    paddingLeft: theme.spacing(3),
    padding: theme.spacing(3),
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    marginBottom: 3,
  },
  action: {
    flex: '0 0 200px',
  },
  photo: {
    height: '100%',
  },
  commentIcon: {
    fontSize: 14,
    color: theme.palette.secondary[600],
    marginRight: 5,
  },
  commentsNumber: {
    marginRight: 10,
  },
  description: {
    marginTop: theme.spacing(1),
    color: theme.palette.secondary[500],
  },
  publisher: {
    fontSize: 14,
    marginRight: 10,
    '& a': {
      color: theme.palette.secondary[900],
    },
  },
  deleted: {
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'italic',
    '& p': {
      marginRight: 10,
    },
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& h6': {
      marginRight: 10,
    },
  },
}));

export default useEntriesItemStyle;