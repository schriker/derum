import { makeStyles, Theme } from '@material-ui/core';

const useEmojisPickerStyles = makeStyles((theme: Theme) => ({
  emojisWrapper: {
    minWidth: 372,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.grey[800],
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
  emoji: {
    flex: '0 0 12.5%',
    padding: '5px 3px',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '& img': {
      margin: '0 auto',
    },
  },
  active: {
    backgroundColor: theme.palette.grey[800],
  },
  emojis: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default useEmojisPickerStyles;
