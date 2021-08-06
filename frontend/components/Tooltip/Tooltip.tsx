import { Tooltip, withStyles } from '@material-ui/core';

const DarkTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary[800],
  },
}))(Tooltip);

export default DarkTooltip;
