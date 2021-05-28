import { makeStyles, Theme } from '@material-ui/core';

const useNewRoomStyles = makeStyles((theme: Theme) => ({
  newRoomButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

export default useNewRoomStyles;
