import { makeStyles, Theme } from '@material-ui/core';

const useRoomSearchAutocompleteStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.secondary['A700'],
    boxShadow: theme.shadows[5],
  },
  option: {
    padding: 0,
  },
}));

export default useRoomSearchAutocompleteStyles;
