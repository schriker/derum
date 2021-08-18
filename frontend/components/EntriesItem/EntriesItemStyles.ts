import { makeStyles, Theme } from '@material-ui/core';

const useEntriesItemStyle = makeStyles<Theme, { searchView: boolean }>(
  (theme) => ({
    content: (props) => ({
      padding: props.searchView ? theme.spacing(1) : theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5),
      },
      '&:last-child': {
        paddingBottom: props.searchView ? theme.spacing(1) : theme.spacing(3),
      },
    }),
    wrapper: (props) => ({
      display: 'flex',
      position: 'relative',
      borderRadius: props.searchView ? 0 : theme.shape.borderRadius,
      marginBottom: props.searchView ? theme.spacing(1.5) : theme.spacing(0.5),
      paddingBottom: props.searchView ? theme.spacing(1.5) : 0,
      paddingLeft: props.searchView ? theme.spacing(2) : 0,
      paddingRight: props.searchView ? theme.spacing(2) : 0,
      borderBottom: props.searchView
        ? `1px solid ${theme.palette.divider}`
        : 'none',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    }),
    action: (props) => ({
      flex: props.searchView ? '0 0 120px' : '0 0 200px',
      [theme.breakpoints.down('md')]: {
        height: '100px',
      },
    }),
    title: (props) => ({
      fontSize: props.searchView ? '16px' : '18px',
      fontWeight: props.searchView ? 600 : 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    }),
    photo: {
      height: '100%',
    },
    commentIcon: {
      fontSize: 14,
      color: theme.palette.secondary[600],
      marginRight: 5,
    },
    commentsNumber: {
      display: 'flex',
      marginRight: 10,
      '& div': {
        marginLeft: 3,
      },
    },
    description: {
      marginTop: theme.spacing(1),
      color: theme.palette.secondary[500],
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
    publisher: {
      fontSize: 14,
      marginRight: 10,
      '& a': {
        color: theme.palette.secondary[900],
      },
      [theme.breakpoints.down('sm')]: {
        top: 10,
        right: 0,
        position: 'absolute',
      },
    },
    deleted: {
      display: 'flex',
      alignItems: 'center',
      fontStyle: 'italic',
      '& p': {
        marginRight: 10,
      },
    },
    info: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      '& h6': {
        marginLeft: 10,
        marginRight: 10,
      },
    },
    vote: {
      display: 'flex',
    },
    contentWrapper: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
  })
);

export default useEntriesItemStyle;
