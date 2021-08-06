import {
  Button,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles<Theme, { isActive: boolean }>((theme: Theme) =>
  createStyles({
    root: (props) => ({
      flex: '1 1',
      fontSize: 16,
      fontWeight: 600,
      textTransform: 'initial',
      borderRadius: 0,
      color: theme.palette.text.primary,
      borderBottom: props.isActive
        ? `2px solid ${theme.palette.primary['A400']}`
        : '2px solid transparent',
      padding: '5px 20px',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.primary['A400']}`,
      },
    }),
    startIcon: {
      color: theme.palette.text.secondary,
    },
    disabled: {
      backgroundColor: theme.palette.grey[300],
    },
  })
);

const ButtonRoomContent = ({
  isActive = false,
  children,
  ...rest
}: ButtonProps & { isActive?: boolean }) => {
  const classes = useStyles({
    isActive,
  });
  return (
    <Button classes={classes} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonRoomContent;
