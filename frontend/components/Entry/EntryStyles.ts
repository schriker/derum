import { makeStyles, Theme } from '@material-ui/core';

const useEntryStyles = makeStyles((theme: Theme) => ({
  bodyWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useEntryStyles;
