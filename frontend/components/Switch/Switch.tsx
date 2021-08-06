import {
  createStyles,
  SwitchClassKey,
  SwitchProps,
  Theme,
  withStyles,
  Switch as MUISwitch,
} from '@material-ui/core';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const Switch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 24,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 0,
      color: theme.palette.secondary[600],
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.palette.primary['A700'],
          opacity: 1,
        },
      },
      '&$focusVisible $thumb': {
        color: theme.palette.primary['A700'],
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
      boxShadow: 'none',
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.divider,
      opacity: 1,
      transition: theme.transitions.create(['background-color']),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <MUISwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default Switch;
