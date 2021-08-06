import { makeStyles, Theme } from '@material-ui/core';

const useUserProfileContentCreatedRoomsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useUserProfileContentCreatedRoomsStyles;
