import { makeStyles } from '@material-ui/core';

const useSearchStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchPopperWrapper: {
    flex: '1 1 500px',
    maxWidth: '500px',
    position: 'relative',
  },
}));

export default useSearchStyles;
