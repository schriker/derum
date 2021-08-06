import { makeStyles } from '@material-ui/core';
import theme from '../../lib/theme';

const useUserProfileEntriesStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 15,
    marginRight: theme.spacing(2),
  },
}));

export default useUserProfileEntriesStyles;