import { makeStyles } from '@material-ui/core';
import theme from '../../lib/theme';

const useUserProfileCommentsStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
}));

export default useUserProfileCommentsStyles;
