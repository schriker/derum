import { makeStyles, Theme } from '@material-ui/core';

const useAvatarUploadStyles = makeStyles<Theme>((theme: Theme) => ({
  photo: {
    height: 50,
    width: 50,
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    padding: 0,
    position: 'relative',
    cursor: 'pointer',
    '&:hover $deleteLabel': {
      opacity: 1,
    },
  },
  deleteLabel: {
    height: 50,
    width: 50,
    opacity: 0,
    zIndex: 999,
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    position: 'absolute',
    transition: theme.transitions.create(['opacity'], { duration: 100 }),
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

export default useAvatarUploadStyles;
