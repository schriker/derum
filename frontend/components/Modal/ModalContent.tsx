import { withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

const ModalContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))(MuiDialogContent);

export default ModalContent;
