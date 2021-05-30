import { makeStyles, Theme } from '@material-ui/core';

const useRoomAddContentButtonsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 2,
    height: 55,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useRoomAddContentButtonsStyles;
