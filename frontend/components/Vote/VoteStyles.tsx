import { makeStyles, Theme } from '@material-ui/core';

const useVoteStyle = makeStyles<Theme, { justifyContent: string }>(
  (theme: Theme) => ({
    vote: {
      flex: '0 0 auto',
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: (props) => props.justifyContent,
      backgroundColor: theme.palette.grey[900],
    },
    voteText: {
      margin: '5px 0',
    },
  })
);

export default useVoteStyle;
