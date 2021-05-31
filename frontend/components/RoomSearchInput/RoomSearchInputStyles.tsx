import { makeStyles, Theme } from '@material-ui/core';

const useRoomSearchInputStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 18,
    marginRight: 10,
    color: theme.palette.grey[500],
  },
}));

export default useRoomSearchInputStyles;
