import {
  createStyles,
  Dialog,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle, {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';
import React from 'react';
import { ModalProps } from '../../types/modal';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(2),
    },
  });

interface Props extends WithStyles<typeof styles> {
  close: () => void;
}

const DialogTitle = withStyles(styles)((props: Props & DialogTitleProps) => {
  const { children, classes, close, ...rest } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...rest}>
      <Typography variant="h5" style={{ marginRight: 60 }}>
        {children}
      </Typography>
      <ButtonIcon
        size="small"
        aria-label="close"
        className={classes.closeButton}
        onClick={close}
      >
        <CloseIcon />
      </ButtonIcon>
    </MuiDialogTitle>
  );
});

const ModalContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
}))(MuiDialogContent);

const Modal = ({ children, title, isOpen, close }: ModalProps) => {
  return (
    <Dialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="customized-dialog-title" close={close}>
        {title}
      </DialogTitle>
      <ModalContent>{children}</ModalContent>
    </Dialog>
  );
};

export default Modal;
