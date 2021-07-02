import { makeStyles } from '@material-ui/core';

const useChatMessagesStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  chat: {
    flex: '1 1 auto',
    overflow: 'auto',
    flexDirection: 'column-reverse',
    display: 'flex',
    paddingRight: '5px',
    height: '100%',
  },
  bottomButton: {
    position: 'absolute',
    left: '50%',
    bottom: 20,
    transform: 'translate(-50%, 0)',
  },
}));

export default useChatMessagesStyles;
