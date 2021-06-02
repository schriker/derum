import { MenuItem, withStyles } from '@material-ui/core';

const DropdownItem = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingRight: theme.spacing(5),
    '&:hover': {
      backgroundColor: theme.palette.secondary['800'],
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary['800'],
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default DropdownItem;
