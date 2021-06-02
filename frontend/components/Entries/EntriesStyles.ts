import { makeStyles, Theme } from '@material-ui/core';

const useEntriesStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 15,
  },
}));

export default useEntriesStyles;
