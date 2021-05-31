import { makeStyles, Theme } from '@material-ui/core';

const useRoomNewLinkPreviewStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  photo: {
    width: 250,
  },
  info: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default useRoomNewLinkPreviewStyles;
