import { makeStyles, Theme } from '@material-ui/core';

const useEntriesItemStyle = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 3,
  },
  action: {
    flex: '0 0 200px',
  },
  photo: {
    height: '100%',
  },
  vote: {
    flex: '0 0 65px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  voteText: {
    margin: '5px 0',
  },
  description: {
    color: theme.palette.grey[500],
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& p': {
      marginRight: 10,
    },
  },
}));

export default useEntriesItemStyle;
