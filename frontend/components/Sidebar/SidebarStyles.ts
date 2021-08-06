import { makeStyles, Theme } from '@material-ui/core';
import { SidebarStyles } from '../../types/styles';

const useSidebarStyles = makeStyles<Theme, SidebarStyles>((theme: Theme) => ({
  photo: (props) => ({
    fontWeight: 400,
    border: props.isActive ? '2px solid' : '0',
    borderColor: props.isActive ? theme.palette.primary['A400'] : 'transparent',
    marginRight: 15,
    width: 25,
    height: 25,
  }),
  button: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    borderRadius: 0,
    justifyContent: 'flex-start',
  },
  name: {
    wordBreak: 'break-word',
    textAlign: 'initial',
  },
  userNumber: {
    marginLeft: 10,
    color: theme.palette.secondary[500],
  },
  sectionTitle: {
    margin: '5px 16px',
  },
}));

export default useSidebarStyles;
