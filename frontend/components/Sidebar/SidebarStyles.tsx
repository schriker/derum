import { makeStyles, Theme } from '@material-ui/core';

const useSidebarStyles = makeStyles((theme: Theme) => ({
  photo: {
    fontWeight: 400,
    border: '2px solid',
    borderColor: theme.palette.grey[600],
    marginRight: 15,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userNumber: {
    marginLeft: 10,
    color: theme.palette.grey[500],
  },
  sectionTitle: {
    margin: 5,
  },
  newRoomButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useSidebarStyles;
