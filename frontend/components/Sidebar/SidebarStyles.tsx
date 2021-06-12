import { makeStyles, Theme } from '@material-ui/core';

const useSidebarStyles = makeStyles((theme: Theme) => ({
  photo: (props: any) => ({
    fontWeight: 400,
    border: '2px solid',
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
  userNumber: {
    marginLeft: 10,
    color: theme.palette.grey[500],
  },
  sectionTitle: {
    margin: '5px 16px',
  },
}));

export default useSidebarStyles;
