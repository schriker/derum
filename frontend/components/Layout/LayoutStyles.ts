import { makeStyles, Theme } from '@material-ui/core';

const useLayoutStyles = makeStyles((theme: Theme) => ({
  layout: {
    display: 'flex',
    alignItems: 'stretch',
    height: 'calc(100% - 60px)',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '56px',
    },
  },
}));

export default useLayoutStyles;
