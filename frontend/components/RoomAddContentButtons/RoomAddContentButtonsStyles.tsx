import { makeStyles, Theme } from '@material-ui/core';

const useRoomAddContentButtonsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: theme.spacing(1),
    height: 55,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useRoomAddContentButtonsStyles;
