import { makeStyles, Theme } from '@material-ui/core';

const useHeaderStyles = makeStyles<Theme>((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    '& :first-child': {
      marginRight: theme.spacing(1),
    },
  },
  userIcon: {
    marginLeft: 2,
    color: theme.palette.text.secondary,
    fontSize: 16,
  },
  photo: {
    height: 50,
    width: 50,
  },
  content: {
    flex: '1 1 100%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
    wordBreak: 'break-word',
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    padding: 0,
    cursor: 'pointer',
  },
  photoWrapper: {
    position: 'relative',
  },
  progress: {
    top: -5,
    left: -5,
    zIndex: 1,
    color: theme.palette.primary['A700'],
    position: 'absolute',
  },
}));

export default useHeaderStyles;
