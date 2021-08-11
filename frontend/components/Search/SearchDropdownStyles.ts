import { makeStyles, Theme } from '@material-ui/core';

const useSearchDropdownStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
    minHeight: 50,
    zIndex: 999,
    marginTop: 5,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[15],
  },
  noResults: {
    minHeight: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useSearchDropdownStyles;
