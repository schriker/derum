import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import MuiDialogTitle, {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
    },
  });

interface Props extends WithStyles<typeof styles> {
  close: () => void;
}

const ModalTitle = withStyles(styles)((props: Props & DialogTitleProps) => {
  const { children, classes, close, ...rest } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...rest}>
      <Typography variant="h5" style={{ marginRight: 60 }}>
        {children}
      </Typography>
      <ButtonIcon
        color="secondary"
        size="small"
        aria-label="close"
        className={classes.closeButton}
        onClick={close}
      >
        <CloseIcon style={{ fontSize: 22 }} />
      </ButtonIcon>
    </MuiDialogTitle>
  );
});

export default ModalTitle;
