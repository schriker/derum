import { ListItemIcon, withStyles } from '@material-ui/core';

const DropdownIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    minWidth: 35,
  },
}))(ListItemIcon);

export default DropdownIcon;
