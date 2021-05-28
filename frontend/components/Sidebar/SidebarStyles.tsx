import { makeStyles, Theme } from '@material-ui/core';

const useSidebarStyles = makeStyles((theme: Theme) => ({
  photo: (props: any) => ({
    fontWeight: 400,
    border: '2px solid',
    borderColor: props.isActive
      ? theme.palette.primary['A400']
      : theme.palette.grey[600],
    marginRight: 15,
    width: 30,
    height: 30,
  }),
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userNumber: {
    marginLeft: 10,
    color: theme.palette.grey[500],
  },
  sectionTitle: {
    margin: '5px 8px',
  },
}));

export default useSidebarStyles;
