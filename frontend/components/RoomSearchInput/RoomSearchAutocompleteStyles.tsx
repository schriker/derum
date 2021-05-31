import { makeStyles, Theme } from '@material-ui/core';

const useRoomSearchAutocompleteStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[900],
    boxShadow: theme.shadows[5],
  },
}));

export default useRoomSearchAutocompleteStyles;
