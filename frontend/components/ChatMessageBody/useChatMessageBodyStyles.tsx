import { makeStyles } from '@material-ui/core';

const useChatMessageBodyStyles = makeStyles({
  wrapper: {
    lineHeight: '24px',
    '& img': {
      display: 'inline-block',
      verticalAlign: 'middle',
      margin: '0 3px',
    },
  },
});

export default useChatMessageBodyStyles;
