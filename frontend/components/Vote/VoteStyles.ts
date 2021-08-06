import { makeStyles, Theme } from '@material-ui/core';
import { VoteStyles } from '../../types/styles';

const useVoteStyle = makeStyles<Theme, VoteStyles>((theme: Theme) => ({
  vote: {
    flex: '0 0 auto',
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: (props) => props.justifyContent,
    backgroundColor: theme.palette.secondary['A700'],
  },
  voteText: {
    fontSize: 14,
    margin: '5px 0',
  },
}));

export default useVoteStyle;
