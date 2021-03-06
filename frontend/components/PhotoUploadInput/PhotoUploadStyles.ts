import { makeStyles } from '@material-ui/core';

const usePhotoUploadStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    margin: '0 10px',
  },
}));

export default usePhotoUploadStyles;
