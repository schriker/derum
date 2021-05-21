import { Tooltip, withStyles } from '@material-ui/core';

const DarkTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.grey[800],
  },
}))(Tooltip);

export default DarkTooltip;
