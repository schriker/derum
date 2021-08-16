import { makeStyles } from '@material-ui/core';

const useSearchStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchPopperWrapper: {
    flex: '1 1 100%',
    maxWidth: '100%',
    position: 'relative',
  },
}));

export default useSearchStyles;
