import { makeStyles, Theme } from '@material-ui/core';

const useEntriesSortStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: '8px 10px',
    marginBottom: 3,
    backgroundColor: theme.palette.background.paper,
    '& button': {
      marginRight: 5,
    },
  },
  button: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default useEntriesSortStyles;
