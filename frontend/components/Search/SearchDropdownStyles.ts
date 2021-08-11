import { makeStyles, Theme } from '@material-ui/core';

const useSearchDropdownStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    minHeight: 150,
    zIndex: 999,
    marginTop: 5,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  noResults: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useSearchDropdownStyles;
