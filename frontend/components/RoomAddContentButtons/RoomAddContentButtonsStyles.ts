import { makeStyles, Theme } from '@material-ui/core';

const useRoomAddContentButtonsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 2,
    height: 55,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      flexDirection: 'column',
    },
  },
}));

export default useRoomAddContentButtonsStyles;
