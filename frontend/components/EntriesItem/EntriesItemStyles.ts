import { makeStyles, Theme } from '@material-ui/core';

const useEntriesItemStyle = makeStyles<Theme, { searchView: boolean }>(
  (theme) => ({
    content: (props) => ({
      padding: props.searchView ? theme.spacing(1) : theme.spacing(3),
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
    }),
    action: (props) => ({
      flex: props.searchView ? '0 0 120px' : '0 0 200px',
    }),
    title: (props) => ({
      fontSize: props.searchView ? '14px' : '18px',
      fontWeight: props.searchView ? 600 : 800,
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
      marginRight: 10,
    },
    description: {
      marginTop: theme.spacing(1),
      color: theme.palette.secondary[500],
    },
    publisher: {
      fontSize: 14,
      marginRight: 10,
      '& a': {
        color: theme.palette.secondary[900],
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
        marginRight: 10,
      },
    },
  })
);

export default useEntriesItemStyle;
