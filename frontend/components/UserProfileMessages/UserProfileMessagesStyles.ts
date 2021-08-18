import { makeStyles, Theme } from '@material-ui/core';

const useUserProfileMessagesStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 15,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
}));

export default useUserProfileMessagesStyles;
