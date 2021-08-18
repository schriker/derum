import { withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

const ModalContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))(MuiDialogContent);

export default ModalContent;
